import express from "express";
import passport from "passport";
import { cookieOptions } from "../config/cookieOptions.js";
import { register } from "../controllers/auth/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send("No User Exists");
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
});

export default router;
