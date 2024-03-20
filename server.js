const express = require("express");
const morgan = require("morgan");
// test upload image with multer
const multer = require("multer");
const path = require("path");
const app = express();
const port = 8000;

const HomeRoute = require("./api/routes/home");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

app.use("/homes", HomeRoute);
app.post("/upload", upload.array("images", 12), (req, res, next) => {
  res.send("Upload successful");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
