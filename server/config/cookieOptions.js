export const cookieOptions = {
	httpOnly: true,
	signed: true,
	maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
	// sameSite: app.get("env") === "development" ? true : "none",
	// secure: app.get("env") === "development" ? false : true,
};
