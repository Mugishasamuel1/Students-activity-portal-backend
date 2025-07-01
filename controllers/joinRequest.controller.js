const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const JoinRequest = require("../models/JoinRequest");   

module.exports.AddJoinRequest = asyncHandler(async (req, res, next) => {
  const { activityId, studentId } = req.body;

  if (!activityId || !studentId) {
    return next(new ErrorResponse("Activity ID and Student ID are required", 400));
  }

  const joinRequest = await JoinRequest.create({
    activityId,
    studentId,
  });

  if (joinRequest) {
    return res.status(201).json({
      success: true,
      data: joinRequest,
    });
  } else {
    return next(new ErrorResponse("Error creating join request", 500));
  }
});

module.exports.updateJoinRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { activityId, studentId } = req.body;

  const joinRequest = await JoinRequest.findByIdAndUpdate(
    id,
    { activityId, studentId },
    { new: true, runValidators: true }
  ).populate("activityId studentId");

  if (joinRequest) {
    return res.status(200).json({
      success: true,
      data: joinRequest,
    });
  } else {
    return next(new ErrorResponse("No join requests found", 404));
  }
});

module.exports.getAllJoinRequests = asyncHandler(async (req, res, next) => {
  const joinRequests = await JoinRequest.find().populate("activityId studentId");

  if (joinRequests.length > 0) {
    return res.status(200).json({
      success: true,
      data: joinRequests,
    });
  } else {
    return next(new ErrorResponse("No join requests found", 404));
  }
});

module.exports.getOneJoinRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const joinRequest = await JoinRequest.findById(id).populate("activityId studentId");

  if (joinRequest) {
    return res.status(200).json({
      success: true,
      data: joinRequest,
    });
  } else {
    return next(new ErrorResponse("Join request not found", 404));
  }
});