const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: '114616124253-5fh3igdgbmrbk3gniubg47o4bssc11cq.apps.googleusercontent.com',
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
