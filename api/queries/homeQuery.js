const getAllHome =
  'SELECT * FROM roomImages JOIN home ON home."Name" = roomImages.room_id';
const getHomeByName =
  'SELECT * FROM home JOIN roomImages ON home."Name" = roomImages.room_id WHERE "Name" = $1';
const postNewHome = `INSERT INTO home 
  ("Name", "Number people", "Max people", "Launch", "Refrigerator", "Aekon", "Square", "Price", "toilet", "bathroom") 
  VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10)`;

const updateHome = `UPDATE home 
  SET "Max people"= $1, "Launch"= $2, "Refrigerator" = $3, "Aekon" = $4, "Square" = $5, "Price" = $6,"toilet" = $7, "bathroom" = $8 
  WHERE "Name" = $9`;
const updateHomeV2 = `UPDATE home 
  SET "Max people"= $1, "Launch"= $2, "Refrigerator" = $3, "Aekon" = $4, "Square" = $5, "Price" = $6,"toilet" = $7, "bathroom" = $8 , "Number people" = 0
  WHERE "Name" = $9`;
const deleteHome = 'DELETE FROM home WHERE "Name" = $1';
const deleteImages = "DELETE FROM roomImages WHERE room_id = $1";
module.exports = {
  getAllHome,
  getHomeByName,
  postNewHome,
  updateHomeV2,
  updateHome,
  deleteHome,
  deleteImages,
};
