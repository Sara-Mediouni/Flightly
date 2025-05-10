const env=require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./db.js");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const port = process.env.PORT;
const userRoute = require("./Routes/UserRoute");
const adminRoute = require("./Routes/AdminRoutes");

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use(morgan("dev"));
app.use(helmet());
app.use(ErrorHandler);
connectDB();

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
