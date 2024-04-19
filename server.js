const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// test upload image with multer
const multer = require("multer");
// const path = require("path");
const app = express();
const port = 8000;
const pool = require("./db");

const HomeRoute = require("./api/routes/home");
const UserRoute = require("./api/routes/user");
const LoginRoute = require("./api/routes/login");
const bookSchedule = require("./api/routes/bookSchedule");
// const TestRoute = require("./api/routes/test");

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
// app.use("/test", TestRoute);
app.use("/", LoginRoute);
app.post("/upload", upload.array("images", 5), (req, res, next) => {
  const id = req.body.id;
  const files = req.files.map((file) => file.filename);
  const sql = "INSERT INTO Persons (personid, image) VALUES ($1, $2)";
  pool.query(sql, [id, files], (error, result) => {
    if (error) return res.json({ message: error.message });
    return res.json({ message: "Successfully created" });
  });
});

app.get("/upload", (req, res, next) => {
  const sql = "SELECT * FROM Persons WHERE personid = 11";
  pool.query(sql, (error, result) => {
    if (error) return res.json({ message: error.message });
    return res.json(result.rows);
  });
});

// app.post("/api/images", upload.array("images", 5), async (req, res) => {
//   const id = req.body.id;
//   try {
//     const images = await Promise.all(
//       req.files.map(async (file) => {
//         const result = await pool.query(
//           "INSERT INTO roomImages (room_id,data, name) VALUES ($1, $2, $3) RETURNING *",
//           [id, file.buffer, file.originalname]
//         );
//         return result;
//       })
//     );
//     res.status(200).json(images);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/api/images", async (req, res) => {
//   try {
//     const images = await pool.query("SELECT * FROM roomImages");
//     res.status(200).json(images);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
