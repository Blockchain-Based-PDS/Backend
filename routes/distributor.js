const router = require("express").Router();
const {
  distReg,
  distLogin,
  updateDist,
  addDistributor,
  deleteRegDist,
  suspendDist,
  allDist,
  allReg,
  distDetails,
} = require("../controllers/distController");
const {
  verifyTokenAndDistAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Distributor Reg
router.post("/register", distReg);

// Distributor Login
router.post("/login", distLogin);

// edit dist details
router.put("/edit/:distId", verifyTokenAndDistAuthorization, updateDist);

// Add Distributor to Original Distributor DB
router.post("/add/:id", verifyTokenAndAdmin, addDistributor);

// Delete a particular registration for role of dist
router.delete("/reg/:id", verifyTokenAndAdmin, deleteRegDist);

// Suspend a distributor
router.delete("/:id", verifyTokenAndAdmin, suspendDist);

// all distributors
router.get("/", verifyTokenAndAdmin, allDist);

// all registrations for dist
router.get("/reg", verifyTokenAndAdmin, allReg);

// details of a particular dist
router.get("/:distId", verifyTokenAndDistAuthorization, distDetails);

module.exports = router;
