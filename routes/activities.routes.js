const express = require("express");
const {
  addActivity,
  getAllActivities,
  updateActivity,
  getOneActivity,
  getMyActivities,
} = require("../controllers/activities.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, addActivity);
router.get("/activities/mine", protect, getMyActivities);
router.get("/", protect, getAllActivities);
router.get("/:id", protect, getOneActivity);
router.put("/:id", protect, updateActivity);

module.exports = router;
