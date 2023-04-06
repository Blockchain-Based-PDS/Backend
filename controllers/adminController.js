const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const Admin = require("../models/admin");
const RegisteredDist = require("../models/registeredDist");
const jwt = require("jsonwebtoken");
const Distributor = require("../models/distributor");

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
    res.status(500).json(err);
  }
};

exports.suspendDist = async (req, res) => {
  const id = req.params.id;
  try {
    await Distributor.findByIdAndDelete(id);
    res.status(200).json("Distributor suspended!");
  } catch (error) {
    res.status(500).json(err);
  }
};
