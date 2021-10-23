import ErrorResponse from "../utils/errorResponse.js";

/**
 * Error-handling middleware that catches all errors passed using next()
 * @param {Object} err The error object containing the error code, message, and name
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} next Calls the next middleware
 */
const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	if (err.code === 11000) {
		const message = `Duplicate Field value entered`;
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	console.log(error.message);

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error",
	});
};

export default errorHandler;
