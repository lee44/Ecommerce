import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ username, email, password });
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

		sendToken(user, 200, res);
	} catch (err) {
		next(err);
	}
};

export const resetPassword = async (req, res, next) => {};

export const forgotPassword = async (req, res, next) => {};

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	res.status(statusCode).json({ success: true, token });
};
