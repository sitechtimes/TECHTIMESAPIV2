require("dotenv").config({ path: ".env" });
const test = require("../models/test");

exports.auth = async (req, res, next) => {
  try {
    const data = test;

    res.json(data);
  } catch (error) {
    res.json(
      "verification failed. kevins french kiss denied. kevins special spanish spanking being delivered"
    );
  }

  /* try {} catch (error) {} */
};
