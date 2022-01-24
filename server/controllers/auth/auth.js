import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import { cookieOptions } from "../../config/cookieOptions.js";
import User from "../../models/user.js";
import ErrorResponse from "../../utils/errorResponse.js";
import { sendEmail } from "../../utils/sendEmail.js";

dotenv.config();

/**
 * * Important information is highlighted
 * ! Deprecated
 * ? Put a question here
 * TODO: Put any task here
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = new User({ username, email, password });
		console.log("User Registered");

		const token = user.getSignedJwtToken();
		const refreshToken = user.getSignedRefreshToken();
		user.refreshToken.push({ refreshToken });

		await user.save();

		res.cookie("refreshToken", refreshToken, cookieOptions);
		res.send({ success: true, username: username, token: token });
	} catch (err) {
		next(err);
	}
};

export const login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send(info);
		} else {
			req.logIn(user, { session: false }, async (err) => {
				if (err) {
					return next(err);
				}
				try {
					const user = await User.findById(req.user._id);
					const token = user.getSignedJwtToken();
					const refreshToken = user.getSignedRefreshToken();
					user.refreshToken.push({ refreshToken });
					await user.save();

					res.cookie("refreshToken", refreshToken, cookieOptions);
					res.send({ success: true, username: user.username, token: token });
				} catch (error) {
					return next(error);
				}
			});
		}
	})(req, res, next);
};

export const logout = (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	User.findById(req.user._id).then(
		(user) => {
			const tokenIndex = user.refreshToken.findIndex((item) => item.refreshToken === refreshToken);

			if (tokenIndex !== -1) {
				user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
				user.save((err, user) => {
					if (err) {
						res.statusCode = 500;
						res.send(err);
					} else {
						res.clearCookie("refreshToken", cookieOptions);
						res.send({ success: true });
					}
				});
			} else {
				res.send("Already Logged Out");
			}
		},
		(err) => next(err)
	);
};

export const forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorResponse("No email could not be sent", 404));
		}

		// Reset Token Gen and add to database hashed (private) version of token
		const resetToken = user.getResetPasswordToken();

		await user.save();
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

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

export const resetPassword = async (req, res, next) => {
	// Compare token in URL params to hashed token
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

export const refreshToken = (req, res, next) => {
	// req.signedCookies["refreshToken"] equivalent to the below two lines
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			const userId = payload._id;
			User.findOne({ _id: userId }).then(
				(user) => {
					if (user) {
						// Find the refresh token against the user record in database
						const tokenIndex = user.refreshToken.findIndex((item) => item.refreshToken === refreshToken);

						if (tokenIndex === -1) {
							res.statusCode = 401;
							res.send("Refresh Token doesn't exist in database");
						} else {
							const token = user.getSignedJwtToken();
							// If the refresh token exists, then create new one and replace it.
							const newRefreshToken = user.getSignedRefreshToken();
							user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
							user.save((err, user) => {
								if (err) {
									res.statusCode = 500;
									res.send(err);
								} else {
									res.cookie("refreshToken", newRefreshToken, cookieOptions);
									res.send({ success: true, token });
								}
							});
						}
					} else {
						res.statusCode = 401;
						res.send("User doesn't exists");
					}
				},
				(err) => next(err)
			);
		} catch (err) {
			res.statusCode = 401;
			console.log(err);
			res.send("Refresh Token is corrupted");
		}
	} else {
		res.statusCode = 401;
		res.send("Refresh Token missing");
	}
};
