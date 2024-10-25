const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const testSchema = new mongoose.Schema({
  id: String,
  saleDate: Date,
  items: [
    {
      name: String,
      tags: [String],
      price: Number,
      quantity: Number,
    },
  ],
  storeLocation: String,
  customer: {
    gender: String,
    age: Number,
    email: String,
    satisfaction: Number,
  },
  couponUsed: Boolean,
  purchaseMethod: String,
});

module.exports = mongoose.model("sales", testSchema);
