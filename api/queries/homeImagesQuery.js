const getAllImages = "SELECT * FROM roomImages";
const getARoomImages = "SELECT images FROM roomImages where room_id = $1";
const postImage =
  "UPDATE roomImages SET images = images || $1 where room_id = $2";

module.exports = {
  getAllImages,
  getARoomImages,
  postImage,
};
