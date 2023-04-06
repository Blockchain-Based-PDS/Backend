const {
  login,
  register,
  updateUser,
  allUsers,
  userDetails,
  allUsersUnderADist,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndDistAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

// register the user
router.post("/register", register);

// user login
router.post("/login", login);

// edit user details
router.put("/edit/:id", verifyTokenAndUserAuthorization, updateUser);

// all users
router.get("/", verifyTokenAndAdmin, allUsers);

// user detail
router.get("/:id", verifyTokenAndUserAuthorization, userDetails);

// users under a dist
// here id is distId
router.get("/all/:id", verifyTokenAndDistAuthorization, allUsersUnderADist);

// delete user
router.delete("/:id", verifyTokenAndDistAuthorization, deleteUser);

module.exports = router;
