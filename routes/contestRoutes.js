const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getContest,
  createContest,
  getContestbyId,
  updateContest,
  deleteContest,
} = require("../controllers/contestController");

router.post(
  "/createCon",
  authenticateUser,
  authorizePermissions("admin"),
  createContest
);
router.get("/", getContest);
router.get("/getCon/:id", getContestbyId);
router.patch(
  "/updateCon",
  authenticateUser,
  authorizePermissions("admin"),
  updateContest
);
router.post(
  "/deleteCon",
  authenticateUser,
  authorizePermissions("admin"),
  deleteContest
);

module.exports = router;
