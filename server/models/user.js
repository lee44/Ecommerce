import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide username"],
	},
	email: {
		type: String,
		required: [true, "Please provide email address"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

/**
 * Middleware that executes before data is saved into MongoDB https://mongoosejs.com/docs/middleware.html
 * */
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	// Generated 10 random bytes
	const salt = await bcrypt.genSalt(10);
	// Combine 10 random bytes with the user's password
	this.password = await bcrypt.hash(this.password, salt);
	// Pre middleware functions are executed one after another when each middleware calls next
	next();
});

/*
 * Mongoose allows adding an instance method to documents constructed from Models. Similar to a class having methods but Mongoose allows us to define our own
 */
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

/**
 * Returns a web token signed with users id
 */
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

/**
 * Returns a token used for resetting password
 */
UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hash token (private key) and save to database
	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	// Set token expire date
	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

	return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;
