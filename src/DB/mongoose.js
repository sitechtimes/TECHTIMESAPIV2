const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.error(`${err.message}`);
});
