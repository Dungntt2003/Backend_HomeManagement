const getAllHome =
  'SELECT * FROM roomImages JOIN home ON home."Name" = roomImages.room_id';
const getHomeByName =
  'SELECT * FROM home JOIN roomImages ON home."Name" = roomImages.room_id WHERE "Name" = $1';
const postNewHome = `INSERT INTO home 
  ("Name", "Number people", "Max people", "Launch", "Refrigerator", "Aekon", "Square", "Price", "toilet", "bathroom") 
  VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10)`;

const updateHome = `UPDATE home 
  SET "Number people" = $1, "Max people"= $2, "Launch"= $3, "Refrigerator" = $4, "Aekon" = $5, "Square" = $6, "Price" = $7,"toilet" = $8, "bathroom" = $9 
  WHERE "Name" = $10`;
const deleteHome = 'DELETE FROM home WHERE "Name" = $1';
const deleteImages = "DELETE FROM roomImages WHERE room_id = $1";
module.exports = {
  getAllHome,
  getHomeByName,
  postNewHome,
  updateHome,
  deleteHome,
  deleteImages,
};
