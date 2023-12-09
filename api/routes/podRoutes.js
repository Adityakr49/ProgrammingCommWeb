const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getPod,
  createPod,
  getPodbyId,
  updatePod,
  getAllPods,
  deletePod,
} = require("../controllers/podController");

router.post(
  "/createPod",
  authenticateUser,
  authorizePermissions("admin"),
  createPod
);
router.get("/", getPod);
router.get("/getPod/:id", getPodbyId);
router.patch(
  "/updatePod",
  authenticateUser,
  authorizePermissions("admin"),
  updatePod
);
router.get("/getAll", getAllPods);
router.post(
  "/deletePod",
  authenticateUser,
  authorizePermissions("admin"),
  deletePod
);
module.exports = router;
