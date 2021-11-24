import express from "express";
import passport from "passport";
import { register } from "../controllers/auth/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", function (req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect("/login");
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			// return res.redirect("/");
			res.send("User logged In");
		});
	})(req, res, next);
});

export default router;
