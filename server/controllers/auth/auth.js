import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import { cookieOptions } from "../../config/cookieOptions.js";
import User from "../../models/user.js";

dotenv.config();

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
		res.send({ success: true, token });
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
					res.send({ success: true, token });
				} catch (error) {
					return next(error);
				}
			});
		}
	})(req, res, next);
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
