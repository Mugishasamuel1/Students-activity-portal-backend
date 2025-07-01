// Join request with activityId, studentId
const mongoose = require("mongoose");

const JoinRequestSchema = new mongoose.Schema({
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

module.exports = mongoose.model("JoinRequest", JoinRequestSchema);
// This schema defines a join request for an activity, linking the activity and the student who made the request.
// The status field indicates whether the request is pending, accepted, or rejected.