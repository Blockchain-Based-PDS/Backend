const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    aadhar: {
      type: String,
      required: true,
      unique: true,
    },
    ward: {
      type: Number,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    smartCoins: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "distributor", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
