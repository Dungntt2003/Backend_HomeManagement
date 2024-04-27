const getAllImages = "SELECT * FROM roomImages";
const getARoomImages = "SELECT images FROM roomImages where room_id = $1";

module.exports = {
  getAllImages,
  getARoomImages,
};
