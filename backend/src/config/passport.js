import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

console.log("✅ GOOGLE_CLIENT_ID from env:", process.env.GOOGLE_CLIENT_ID);
console.log("✅ GOOGLE_CLIENT_SECRET from env:", process.env.GOOGLE_CLIENT_SECRET);
console.log("✅ GOOGLE_CALLBACK_URL from env:", process.env.GOOGLE_CALLBACK_URL);

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

        // 🔍 Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
          // ❌ No user found → redirect to frontend to sign up manually first
          return done(null, false, { message: "FIRST_TIME_USER" });
        }

        // ✅ If the user exists, ensure googleId is set
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


// Session serialization
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
