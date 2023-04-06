const router = require("express").Router();
const {
  distReg,
  distLogin,
  updateDist,
} = require("../controllers/distController");
const { verifyTokenAndDist } = require("./verifyToken");

// Distributor Reg
router.post("/register", distReg);

// Distributor Login
router.post("/login", distLogin);

router.put("/editDetails/:id", verifyTokenAndDist, updateDist);

module.exports = router;
