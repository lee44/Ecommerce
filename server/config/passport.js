import passportlocal from "passport-local";
import User from "../models/user.js";

const passportConfig = (passport) => {
	var LocalStrategy = passportlocal.Strategy;
	passport.use(
		new LocalStrategy({ usernameField: "email" }, function (username, password, done) {
			User.findOne({ email: username }, "password", function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, { message: "Incorrect username." });
				}
				if (!user.matchPassword(password)) {
					return done(null, false, { message: "Incorrect password." });
				}
				return done(null, user);
			});
		})
	);
	// Stores the user id in the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// Extract the user id from session and search DB for user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};

export default passportConfig;
