var mongoose = require("mongoose");
var Sprints = require("../models/sprintsModel");
const checkAuth = require("../middleware/check-auth");

module.exports = function(app) {
  app.post("/newsprint", checkAuth, (req, res) => {
    const sprint = new Sprints({
      _id: new mongoose.Types.ObjectId(),
      goal: req.body.goal,
      effort_forecast: req.body.effort_forecast
    });
    sprint
      .save()
      .then(() => {
        res.status(201).json({
          message: "Sprint created",
          sprint
        });
      })
      .catch(err => {
        res.status(400).send({ error: err.message });
      });
  });
};
