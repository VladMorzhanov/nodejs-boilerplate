const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bnCrypt = require("bcrypt-nodejs");

const User = new Schema({
  name: { type: String, default: "NaN" },
  email: { type: String, unique: true, default: "NaN" },
  token: { type: String, required: true },
  dateCreated: { type: String, default: Date.now() }
});

User.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  if (user.name) {
    user.name = user.name.trim();
  }

  if (user.password !== "NaN") {
    bnCrypt.hash(user.password, null, null, function(err, hash) {
      if (err) {
        throw new Error(err);
      }

      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

User.methods.comparePassword = function(password) {
  const user = this;

  if (user.password === "NaN") {
    return false;
  }

  return bnCrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("User", User);
