const router = require("express").Router();
const {
  distReg,
  distLogin,
  updateDist,
} = require("../controllers/distController");

// Distributor Reg
router.post("/register", distReg);

// Distributor Login
router.post("/login", distLogin);

router.put("/editDetails/:id", updateDist);

module.exports = router;
