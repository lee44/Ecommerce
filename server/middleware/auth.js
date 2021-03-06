import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

/**
 * Middleware that prevents access to a route unless provided javascript web token is valid
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} next Calls the next middleware
 */
export const protect = async (req, res, next) => {
	let token;

	if (req.headers.cookie) {
		token = req.headers.cookie.split("refresh_token")[1];
	}

	if (!token) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return next(new ErrorResponse("No user found with this id", 404));
		}

		req.user = user;

		next();
	} catch (err) {
		return next(new ErrorResponse("Not authorized to access this router", 401));
	}
};
