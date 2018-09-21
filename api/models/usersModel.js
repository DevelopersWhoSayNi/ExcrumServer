var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Users", usersSchema);
