import { sendAccessToken, sendRefreshToken } from "../../utils/sendToken.js";

export const accessToken = async (req, res, next) => {
	const { username, email, password } = req.headers.cookie;
	try {
		const user = await User.create({ username, email, password });
		console.log("User Registered");
		sendAccessToken(user, 200, res);
	} catch (err) {
		next(err);
	}
};

export const refreshToken = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ username, email, password });
		console.log("User Registered");
		sendRefreshToken(user, 200, res);
	} catch (err) {
		next(err);
	}
};
