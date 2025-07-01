// Withdraw request model with enrollmentId, activityId, studentId
const mongoose = require("mongoose");

const WithdrawRequestSchema = new mongoose.Schema({
  enrollmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: [true, "Enrollment ID is required"],
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: [true, "Activity ID is required"],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Student ID is required"],
  },
}, { timestamps: true });
module.exports = mongoose.model("WithdrawRequest", WithdrawRequestSchema);

// This schema defines a withdraw request for an activity, linking the enrollment, activity, and the student who made the request.
// The timestamps option adds createdAt and updatedAt fields to the schema automatically.