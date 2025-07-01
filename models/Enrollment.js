// enrollment with activityId, StudentId
const mongoose = require("mongoose");
const EnrollmentSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
// This schema defines an enrollment for an activity, linking the activity and the student who enrolled.
// The timestamps option adds createdAt and updatedAt fields to the schema automatically.