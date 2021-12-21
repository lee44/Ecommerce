import express from "express";
import passport from "passport";
import { register } from "../controllers/auth/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send("No User Exists");
		} else {
			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}
				res.send("User logged In");
			});
		}
	})(req, res, next);
});
router.get("/protected-route", isAuth, (req, res, next) => {
	res.send("You made it to the route.");
});

export default router;
