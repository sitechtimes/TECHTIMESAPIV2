const User = require("../models/auth/user");
require("dotenv").config({ path: ".env" });

exports.auth = async (req, res, next) => {
  try {
    res.json(
      "verification failed. kevins french kiss denied. kevins special spanish spanking beign delivered"
    );
  } catch (error) {}
};
