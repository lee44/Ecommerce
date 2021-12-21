import User from "../../models/user.js";

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		await User.create({ username, email, password });
		console.log("User Registered");

		return res.status(200).redirect("/");
	} catch (err) {
		next(err);
	}
};
