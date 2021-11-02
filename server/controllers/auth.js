import crypto from "crypto";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ username, email, password });
		console.log("User Registered");
		sendToken(user, 200, res);
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	// Check if email and password is provided
	if (!email || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400));
	}

	try {
		// Check that user exists by email
		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}

		// Check if password matches
		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}
		console.log("User logged in");
		sendToken(user, 200, res);
	} catch (err) {
		next(err);
	}
};

/**
 * Sends an access and refresh token that allows a user to access routes
 * Refresh token: expires in 15 minutes and renewed using the access token
 * Access token: expires in 24 hours
 * @param {Object} user instance of User model that gives access to all its methods
 * @param {Number} statusCode
 * @param {Object} res The response
 */
const sendToken = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	res.cookie("refresh_token", token, {
		maxAge: 2 * 60 * 1000, // 15 min
		secure: true,
		sameSite: true,
	});
	res.cookie("access_token", token, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hour
	});
	res.status(statusCode).send("Cookie was sent");
};

/**
 * Sends a web token that allows a user to access a route(s)
 * @param {Object} user instance of User model that gives access to all its methods
 * @param {Number} statusCode
 * @param {Object} res The response
 */
export const forgotPassword = async (req, res, next) => {
	// Send Email to email provided but first check if user exists
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorResponse("No email could not be sent", 404));
		}

		// Reset Token Gen and add to database hashed (private) version of token
		const resetToken = user.getResetPasswordToken();

		await user.save();

		// Create reset url to email to provided email
		const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

		// HTML Message
		const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Request",
				text: message,
			});

			res.status(200).json({ success: true, data: "Email Sent" });
		} catch (err) {
			console.log(err);

			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse("Email could not be sent", 500));
		}
	} catch (err) {
		next(err);
	}
};

/**
 * Resets password using the given resetToken
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Object} next calls the next middleware
 */
export const resetPassword = async (req, res, next) => {
	// req.params.resetToken is only a 20 digit random number
	// The number is used to recreate the hashed password that WAS stored in the db
	const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return next(new ErrorResponse("Invalid Token", 400));
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: "Password Updated Success",
			token: user.getSignedJwtToken(),
		});
	} catch (err) {
		next(err);
	}
};
