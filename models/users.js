const mongoose = require("../config/poll");
const Autoincrement = require("mongoose-sequence")(mongoose);

const userSchema = mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.plugin(Autoincrement, {
  id: "user_counter",
  inc_field: "id"
});

const User = mongoose.model("User", userSchema);

module.exports = User;
