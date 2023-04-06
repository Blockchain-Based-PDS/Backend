const CryptoJS = require("crypto-js");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const newAdmin = new Admin({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
    });
    if (!admin) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      admin.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const accessToken = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = admin._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.adminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    const { password, ...others } = admin._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};
