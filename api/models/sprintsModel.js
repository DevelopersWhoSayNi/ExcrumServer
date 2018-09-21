var mongoose = require("mongoose");

var sprintSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  goal: {
    type: String
  },
  start_date: {
    type: Date //,    required: true
  },
  end_date: {
    type: Date //,    required: true
  },
  effort_forecast: {
    type: String
  },
  effort_added_insprint: {
    type: String
  },
  effort_delivered: {
    type: String
  },
  capacity: {
    type: String
  },
  working_days: {
    type: String
  },
  velocity: {
    type: String
  },
  avaliable_resources: {
    type: String
  }
});

module.exports = mongoose.model("Sprint", sprintSchema);
