require("dotenv").config({ path: ".env" });
const sample_supplies = require("../models/test");

exports.auth = async (req, res, next) => {
  try {
    /* const data = sample_supplies.forEach((e) => {
      e.sales;
    }); */

    const salesData = [];
    sample_supplies.forEach((e) => {
      salesData.push(e.sales);
    });

    /* res.json(salesData); */
    return salesData;
  } catch (error) {
    res.json(
      "verification failed. kevins french kiss denied. kevins special spanish spanking being delivered"
    );
  }

  /* try {} catch (error) {} */
};
