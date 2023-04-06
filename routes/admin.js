const router = require("express").Router();
const {
  login,
  addDistributor,
  deleteRegDist,
  suspendDist,
  register,
} = require("../controllers/adminController");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Admin Register
router.post("/register", register);

// Admin login
router.post("/login", login);

// Add Distributor to Original Distributor DB
router.post("/addDist/:id", verifyTokenAndAdmin, addDistributor);

// Delete a particular registration for role of dist
router.delete("/deleteRegDist/:id", verifyTokenAndAdmin, deleteRegDist);

// Suspend a distributor
router.delete("/deleteDist/:id", verifyTokenAndAdmin, suspendDist);

module.exports = router;
