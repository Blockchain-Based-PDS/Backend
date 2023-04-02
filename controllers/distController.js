const RegisteredDist = require("../models/registeredDist");
const Distributor = require("../models/distributor");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.distReg = async (req, res) => {
  const newDist = new RegisteredDist({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedDistributor = await newDist.save();
    res.status(201).json(savedDistributor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.distLogin = async (req, res) => {
  try {
    const distributor = await Distributor.findOne({
      username: req.body.username,
    });
    if (!distributor) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      distributor.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const accessToken = jwt.sign(
      {
        id: distributor._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = distributor._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDist = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDist = await Distributor.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDist);
  } catch (err) {
    res.status(500).json(err);
  }
};
