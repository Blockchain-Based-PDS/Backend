const mongoose = require("mongoose");

const registeredDistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    aadhar: {
      type: Number,
      require: true,
      unique: true,
    },
    bankAccNo: {
      type: String,
      require: true,
      unique: true,
    },
    ifsc: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessRegNo: {
      type: String,
      required: true,
    },
    shopWard: {
      type: Number,
      required: true,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    shopDistrict: {
      type: String,
      required: true,
    },
    shopArea: {
      type: String,
      required: true,
    },
    shopPinCode: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisteredDist", registeredDistSchema);
