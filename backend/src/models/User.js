import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },

    // 👇 Password is optional for OAuth
    password: { type: String, minlength: 6 },

    // ✅ Added Candidate role here
    role: { 
      type: String, 
      enum: ["Admin", "HR", "Employee", "Candidate"], 
      default: "Employee" 
    },

    googleId: { type: String, default: null },
  },
  { timestamps: true }
);

// Hash password if it's set and modified
userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
