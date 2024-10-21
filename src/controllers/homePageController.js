const homePage = require("../models/articles/homePage");
require("dotenv").config({ path: ".env" });

exports.homePage = async (req, res) => {
  try {
    console.log("kevin gives a french kiss <3");
    res.json("kevin gives a french kiss <3");
  } catch (error) {}
};
