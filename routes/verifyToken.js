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
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndDistAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.distId || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, async () => {
    var user = null;
    try {
      user = await User.findById(req.params.id);
    } catch (err) {
      return res.status(403).json("User doesn't exist!");
    }
    if (
      req.user.id === req.params.id ||
      req.user.role === "admin" ||
      (req.user.role === "distributor" &&
        req.user.shopDistrict === user.district &&
        req.user.shopWard === user.ward &&
        req.user.shopPinCode === user.pinCode)
    ) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndDistAuthorization,
  verifyTokenAndUserAuthorization,
};
