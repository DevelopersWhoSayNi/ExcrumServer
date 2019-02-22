var mongoose = require("mongoose");

var teamMembersSchema = mongoose.Schema({
  user_id: String,
  workings_days: Number,
  Working_hours: Number
});

var sprintSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  team_id: String,
  sprint_number: Number,
  sprint_iteration: String,
  start_date: Date, // required: true
  end_date: Date, // required: true
  team_members: [teamMembersSchema],
  sprint_data: {
    effort_expected_forecast: Number,
    effort_forecast: Number,
    effort_added: Number,
    effort_delivered: Number,
    capacity_in_hours: Number,
    working_days: Number,
    available_resources: Number,
    goal: String,
    goal_status: String
  }
});

module.exports = mongoose.model("Sprint", sprintSchema);
