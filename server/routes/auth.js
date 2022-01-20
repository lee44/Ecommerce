import express from "express";
import passport from "passport";
import { cookieOptions } from "../config/cookieOptions.js";
import { register } from "../controllers/auth/auth.js";
import User from "../models/user.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local", { session: false }), async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		const token = user.getSignedJwtToken();
		const refreshToken = user.getSignedRefreshToken();
		user.refreshToken.push({ refreshToken });
		await user.save();
		console.log("User logged In");
		res.cookie("refreshToken", refreshToken, cookieOptions);
		res.send({ success: true, token });
	} catch (error) {
		next(error);
	}
});

export default router;
