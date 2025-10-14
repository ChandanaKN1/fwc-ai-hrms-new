import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 🔹 Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
          // First time Google login → force them to register locally
          return done(null, false, { message: "FIRST_TIME_USER" });
        }

        // 🔸 Update googleId if missing
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("❌ Google Auth Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
