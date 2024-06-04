const insertAnnounce =
  "INSERT INTO announcement (title, content, tag) VALUES ($1, $2, $3)";
const getAllAnnounces = "SELECT * FROM announcement order by post_date DESC";
const updateAnnounce =
  "UPDATE announcement SET title = $1, content = $2, tag = $3, post_date = CURRENT_DATE WHERE id = $4";
const getAnnounceOne = "SELECT * FROM announcement WHERE id = $1";
const deleteAnnounce = "DELETE FROM announcement WHERE id = $1";
module.exports = {
  insertAnnounce,
  getAllAnnounces,
  updateAnnounce,
  getAnnounceOne,
  deleteAnnounce,
};
