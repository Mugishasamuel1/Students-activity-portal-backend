const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const enrollmentModel = require("../models/Enrollment");

module.exports.AddEnrollment = asyncHandler(async (req, res, next) => {
  const { activityId, studentId } = req.body;

  if (!activityId || !studentId) {
    return next(new ErrorResponse("Activity ID and Student ID are required", 400));
  }

  const enrollment = await enrollmentModel.create({
    activityId,
    studentId,
  });

  if (enrollment) {
    return res.status(201).json({
      success: true,
      data: enrollment,
    });
  } else {
    return next(new ErrorResponse("Error creating enrollment", 500));
  }
});

module.exports.updateEnrollment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { activityId, studentId } = req.body;

  const enrollment = await enrollmentModel.findByIdAndUpdate(
    id,
    { activityId, studentId },
    { new: true, runValidators: true }
  ).populate("activityId studentId");

  if (enrollment) {
    return res.status(200).json({
      success: true,
      data: enrollment,
    });
  } else {
    return next(new ErrorResponse("No enrollment found", 404));
  }
});

module.exports.getAllEnrollments = asyncHandler(async (req, res, next) => {
  const enrollments = await enrollmentModel.find().populate("activityId studentId");

  if (enrollments.length > 0) {
    return res.status(200).json({
      success: true,
      data: enrollments,
    });
  } else {
    return next(new ErrorResponse("No enrollments found", 404));
  }
});

module.exports.getOneEnrollment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const enrollment = await enrollmentModel.findById(id).populate("activityId studentId");

  if (enrollment) {
    return res.status(200).json({
      success: true,
      data: enrollment,
    });
  } else {
    return next(new ErrorResponse("Enrollment not found", 404));
  }
});

module.exports.getMyEnrollments = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const enrollments = await enrollmentModel.find({ studentId: userId }).populate("activityId studentId");

  if (enrollments.length > 0) {
    return res.status(200).json({
      success: true,
      data: enrollments,
    });
  } else {
    return next(new ErrorResponse("No enrollments found", 404));
  }
});