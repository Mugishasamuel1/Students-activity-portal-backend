// acitivity model with mongoose with name, activity leader, arrayof days, start time, end tim, description 
const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    uppercase: true
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/ // Validates HH:MM format
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/ // Validates HH:MM format
  }
});

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be at least 3 characters"],
    maxlength: [255, "Name should not be greater than 255 characters"],
  },
  activityLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Activity leader is required"],
  },
  days: [
    timeSlotSchema
  ],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);

