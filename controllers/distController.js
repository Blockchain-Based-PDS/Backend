const RegisteredDist = require("../models/registeredDist");
const nodemailer = require("nodemailer");
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
        role: distributor.role,
        shopDistrict: distributor.shopDistrict,
        shopWard: distributor.shopWard,
        shopPinCode: distributor.shopPinCode,
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

exports.addDistributor = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedDist = await RegisteredDist.findById(id);
    const { _id, status, createdAt, updatedAt, ...others } = searchedDist._doc;
    const savedDist = await Distributor.create(others);

    const hashedPassword = CryptoJS.AES.decrypt(
      savedDist.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "testingemailprojects@gmail.com",
        pass: "atefevxllzjkyekv",
      },
    });

    let details = {
      from: "admin@bpds.com",
      to: savedDist.email,
      subject: "Selected as Distributor",
      html:
        "You are assigned as distributor of <br>" +
        savedDist.shopAddress +
        ", <br>" +
        "Area - " +
        savedDist.shopArea +
        ", <br>" +
        "Ward No. " +
        savedDist.ward +
        ". <br> <br>" +
        "Your Username is <b>" +
        savedDist.username +
        "</b> <br> Password is : <b>" +
        originalPassword +
        "</b> <br> Don't share your credentials with anyone. <br> Thanks <br> Admin BPDS.",
    };
    mailTransporter.sendMail(details, (err) => {
      if (err) console.log(err);
      else console.log("Email Sent");
    });
    res.status(200).json(savedDist);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteRegDist = async (req, res) => {
  const id = req.params.id;
  try {
    await RegisteredDist.findByIdAndDelete(id);
    res.status(200).json("Entry deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.suspendDist = async (req, res) => {
  const id = req.params.id;
  try {
    await Distributor.findByIdAndDelete(id);
    res.status(200).json("Distributor suspended!");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.allDist = async (req, res) => {
  try {
    const response = await Distributor.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.allReg = async (req, res) => {
  try {
    const response = await RegisteredDist.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.distDetails = async (req, res) => {
  try {
    const dist = await Distributor.findById(req.params.id);
    const { password, ...others } = dist._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
