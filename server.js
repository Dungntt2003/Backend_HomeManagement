const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// test upload image with multer
const multer = require("multer");
const path = require("path");
const app = express();
const port = 8000;
const pool = require("./db");

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

app.use("/images", express.static(__dirname + "/images"));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.post("/upload", upload.single("image"), (req, res, next) => {
  const id = req.body.id;
  const file = req.file.filename;
  const sql = 'INSERT INTO Persons ("personid", "image") VALUES ($1, $2)';
  pool.query(sql, [id, file], (error, result) => {
    if (error) return res.json({ message: error.message });
    return res.json({ message: "Successfully created" });
  });
});

app.get("/upload", (req, res, next) => {
  const sql = "SELECT * FROM Persons";
  pool.query(sql, (error, result) => {
    if (error) return res.json({ message: error.message });
    return res.json(result.rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
