const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const distributorSchema = new mongoose.Schema(
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
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: {
      type: Number,
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
    shopAddress: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Distributor", distributorSchema);
