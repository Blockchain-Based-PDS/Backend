const router = require("express").Router();
const {
  addDistributor,
  deleteRegDist,
  suspendDist,
} = require("../controllers/adminController");

// Add Distributor to Original Distributor DB
router.post("/addDist/:id", addDistributor);

// Delete a particular registration for role of dist
router.delete("/deleteRegDist/:id", deleteRegDist);

// Suspend a distributor
router.delete("/deleteDist/:id", suspendDist);

module.exports = router;
