const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const adminRoute = require("./routes/admin");
const distributorRoute = require("./routes/distributor");
const userRoute = require("./routes/user");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoute);
app.use("/api/distributor", distributorRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server Running !");
});
