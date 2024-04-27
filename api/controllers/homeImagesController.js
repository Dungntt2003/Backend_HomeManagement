const pool = require("../../db");

const { getAllImages, getARoomImages } = require("../queries/homeImagesQuery");

const getImages = (req, res, next) => {
  pool.query(getAllImages, (error, result) => {
    if (error) return res.json({ message: error.message });
    return res.json(result.rows);
  });
};

const getRoomImages = (req, res, next) => {
  const id = req.params.id;
  pool.query(getARoomImages, [id], (error, result) => {
    if (error) return res.status(500).json({ message: error.message });
    else if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No images found for this room",
      });
    }
    return res.status(200).json(result.rows[0]);
  });
};

module.exports = {
  getImages,
  getRoomImages,
};
