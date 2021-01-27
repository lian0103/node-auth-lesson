const User = require("../models/User");

module.exports.getUser = async (req, res) => {
  User.find().then((result) => {
    res.json(result);
  });
};
