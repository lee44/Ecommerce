import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";

export const passportLocalConfig = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, function (username, password, done) {
			User.findOne({ email: username }, "password", async function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, { message: "Incorrect username." });
				}
				const matching = await user.comparePassword(password);
				if (!matching) {
					return done(null, false, { message: "Incorrect password." });
				}
				return done(null, user);
			});
		})
	);
};
