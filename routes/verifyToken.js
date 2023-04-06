const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Distributor = require("../models/distributor");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
        return;
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
    return;
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const admin = await Admin.findById(req.user.id);
      if (!admin)
        return res.status(401).json("You are not allowed to do that!");
    } catch (err) {
      return res.status(500).json(err);
    }
    next();
  });
};

const verifyTokenAndDist = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const dist = await Distributor.findById(req.user.id);
      if (!dist) return res.status(401).json("You are not allowed to do that!");
    } catch (err) {
      return res.status(500).json(err);
    }
    next();
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const user = await user.findById(req.user.id);
      if (!user) return res.status(401).json("You are not allowed to do that!");
    } catch (err) {
      return res.status(500).json(err);
    }
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndDist,
  verifyTokenAndUser,
};
