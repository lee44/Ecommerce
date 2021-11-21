/**
 * Sends an access and refresh token that allows a user to access routes
 * Access token: expires in 15 minutes and renewed using the access token
 * Refresh token: expires in 24 hours
 * @param {Object} user instance of User model that gives access to all its methods
 * @param {Number} statusCode
 * @param {Object} res the response to be sent to client
 */
export const sendToken = (user, statusCode, res) => {
	const access_token = user.getSignedJwtToken("15m");
	const refresh_token = user.getSignedJwtToken("24h");

	res.cookie("refresh_token", refresh_token, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hour
		httpOnly: true,
		secure: true,
		sameSite: true,
	});
	res.status(statusCode).send({ username: user.username, access_token: access_token });
};

/**
 * Sends an access token that allows a user to access routes
 * Access token: expires in 15 minutes and renewed using the access token
 * @param {Object} user instance of User model that gives access to all its methods
 * @param {Number} statusCode
 * @param {Object} res the response to be sent to client
 */
export const sendAccessToken = (user, statusCode, res) => {
	const access_token = user.getSignedJwtToken("15m");
	res.status(statusCode).send(access_token);
};

/**
 * Sends a refresh token that allows a user to access routes
 * Refresh token: expires in 24hr and renewed using the access token
 * @param {Object} user instance of User model that gives access to all its methods
 * @param {Number} statusCode
 * @param {Object} res the response to be sent to client
 */
export const sendRefreshToken = (user, statusCode, res) => {
	const refresh_token = user.getSignedJwtToken("24h");

	res.cookie("refresh_token", refresh_token, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hour
		httpOnly: true,
		secure: true,
		sameSite: true,
	});
	res.status(statusCode).send("Refresh token sent");
};
