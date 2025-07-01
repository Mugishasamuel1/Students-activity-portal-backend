const asyncHandler = require("../middleware/async");
const Activity = require("../models/Activity");
const ErrorResponse = require("../utils/ErrorResponse");


  // addActivity,
  // getAllActivities,
  // updateActivity,
  // getOneActivity,
  // getMyActivities,

module.exports.addActivity = asyncHandler(async (req, res, next) => {
  const { name, activityLeader, days } = req.body;
  const user = req.user;
  let activity = await Activity.create({
    name,
    activityLeader,
    days,
    description: req.body.description,
  });
  if (activity) {
    return res.status(201).json({
      success: true,
      data: activity,
    });
  }
  return next(new ErrorResponse("Activity not created", 500));
});

module.exports.getAllActivities = asyncHandler(async (req, res, next) => {
  const activities = await Activity.find().populate("activityLeader", "names");
  if (activities.length > 0) {
    return res.status(200).json({
      success: true,
      data: activities,
    });
  }
  return next(new ErrorResponse("No activities found", 404));
});

module.exports.updateActivity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .populate("activityLeader", "names");
  if (activity) {
    return res.status(200).json({
      success: true,
      data: activity,
    });
  }
  return next(new ErrorResponse("Activity not found", 404));
}); 

module.exports.getOneActivity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const activity = await Activity.findById(id).populate("activityLeader", "names");
  if (activity) {
    return res.status(200).json({
      success: true,
      data: activity,
    });
  }
  return next(new ErrorResponse("Activity not found", 404));
});

module.exports.getMyActivities = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const activities = await Activity.find({ activityLeader: userId }).populate("activityLeader", "names");
  if (activities.length > 0) {
    return res.status(200).json({
      success: true,
      data: activities,
    });
  }
  return next(new ErrorResponse("No activities found for this user", 404));
});
