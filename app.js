require("dotenv").config();
require("express-async-error");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDB = require("./db/connect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const express = require("express");
const notFound = require("./middlewares/not-found-error");
const cookies = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookies(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);
app.listen(port, () => console.log(`server listening on port ${port}.....`));
