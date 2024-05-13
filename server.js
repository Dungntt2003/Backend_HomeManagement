const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 8000;
const pool = require("./db");

const HomeRoute = require("./api/routes/home");
const UserRoute = require("./api/routes/user");
const LoginRoute = require("./api/routes/login");
const bookSchedule = require("./api/routes/bookSchedule");
const homeImages = require("./api/routes/homeImages");

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
app.use("/users", UserRoute);
app.use("/bookSchedule", bookSchedule);
app.use("/upload", homeImages);
app.use("/", LoginRoute);

app.post("/upload", upload.array("images", 5), (req, res, next) => {
  const id = req.body.id;
  const files = req.files.map((file) => file.filename);
  const checkRoom = "SELECT * from roomImages where room_id = $1";
  const insert = "INSERT INTO roomImages (room_id, images) VALUES ($1,$2)";
  const sql = "UPDATE roomImages SET images = $1 where room_id = $2";
  pool.query(checkRoom, [id], (err, result) => {
    if (err)
      return result.status(409).json({
        message: err.message,
      });
    if (result.rows.length > 0) {
      pool.query(sql, [files, id], (error, result) => {
        if (error) return res.json({ message: error.message });
        return res.json({ message: "Successfully created" });
      });
    } else {
      pool.query(insert, [id, files], (err, result) => {
        if (err) return res.status(409).json({ message: err.message });
        return res.status(200).json({ message: "Successfully created" });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
