const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8000;

const HomeRoute = require("./api/routes/home");

app.use(express.json());
app.use(morgan('combined'));
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
