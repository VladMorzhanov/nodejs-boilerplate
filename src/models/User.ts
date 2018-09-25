import mongoose from "mongoose";
import bnCrypt from "bcrypt-nodejs";
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, default: "NaN" },
  email: { type: String, unique: true, default: "NaN" },
  token: { type: String, required: true },
  dateCreated: { type: String, default: Date.now() }
});

User.pre("save", (next: Function) => {
  const user = this;

  if (!user.isModified("password")) return next();
  if (user.name) {
    user.name = user.name.trim();
  }

  if (user.password !== "NaN") {
    bnCrypt.hash(user.password, null, null, (err: Error, hash: string) => {
      if (err) {
        throw new Error(err.message);
      }

      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

User.methods.comparePassword = (password: string) => {
  const user = this;
  if (user.password === "NaN") {
    return false;
  }

  return bnCrypt.compareSync(password, user.password);
};

export default mongoose.model("User", User);
