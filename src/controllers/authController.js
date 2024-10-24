require("dotenv").config({ path: ".env" });
const sales = require("../models/test");

exports.auth = async (req, res, next) => {
  try {
    const data = new sales(req.body);

    /* const salesData = [];
    sample_supplies.forEach((e) => {
      salesData.push(e.sales);
    }); */

    /* res.json(data); */
    /* return salesData; */
    await data.save();

    res.json("success bitch");
  } catch (err) {
    console.log(err);
    res.json(
      "verification failed. kevins french kiss denied. kevins special spanish spanking being delivered"
    );
  }

  /* try {} catch (error) {} */
};
