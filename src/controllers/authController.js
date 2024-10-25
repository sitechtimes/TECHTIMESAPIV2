require("dotenv").config({ path: ".env" });
const sales = require("../models/test");

exports.auth = async (req, res, next) => {
  try {
    const data = new sales(req.body);
    await data.save();

    res.json("success bitch");
    next();
  } catch (err) {
    console.log(err);
    res.json(
      "verification failed. kevins french kiss denied. kevins special spanish spanking being delivered"
    );
  }
};
