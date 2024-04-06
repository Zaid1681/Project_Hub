require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const connect = require("./db");
const cors = require("cors");
const app = express();
const routes = require("./routes/index.routes.js");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 8080;

var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // This will allow our app to take any JSON file from outside
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Server running on port " + PORT);
});
