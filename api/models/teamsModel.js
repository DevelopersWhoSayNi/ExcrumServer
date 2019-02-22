var mongoose = require("mongoose");
var UsersSchema = require("./usersModel");

var teamsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  root_iteration_path: {
    type: String,
    required: true,
    unique: true
  },
  settings: {
    weeks_in_sprint: Number
  },
  team_members: [UsersSchema],
  status: String
});

module.exports = mongoose.model("teams", teamsSchema);
