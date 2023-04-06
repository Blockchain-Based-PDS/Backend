const router = require("express").Router();
const {
  login,
  register,
  adminDetails,
  updateDetails,
} = require("../controllers/adminController");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Admin Register
router.post("/register", register);

// Admin login
router.post("/login", login);

// admin details
router.get("/:id", verifyTokenAndAdmin, adminDetails);

// update admin details
router.put("/:id", verifyTokenAndAdmin, updateDetails);

module.exports = router;
