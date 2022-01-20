import { cookieOptions } from "../../config/cookieOptions.js";
import User from "../../models/user.js";

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
