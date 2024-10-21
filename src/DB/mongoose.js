const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

mongoose.connect(`${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.error(`${err.message}`);
});
