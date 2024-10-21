const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  _id: String,
  saleDate: Date,
  items: {
    name: String,
    tags: {
      String,
    },
    price: Number,
    quantity: Number,
  },
  storeLocation: String,
  customer: Object,
  couponUsed: Boolean,
  purchaseMethod: String,
});
