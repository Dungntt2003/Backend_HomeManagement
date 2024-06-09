const insertNewRenter =
  "INSERT INTO inRoom (room_id, user_id, startDate, endDate) VALUES ($1,$2,$3,$4)";

const updateRenterDate = "UPDATE inRoom SET endDate = $1 where id = $2";
const getAll = "SELECT * FROM inRoom";
const getRenterByRoom =
  "SELECT * FROM inRoom join users on inRoom.user_id = users.id where room_id = $1";
const getBill = "SELECT * FROM bill WHERE room_id = $1";
module.exports = {
  insertNewRenter,
  updateRenterDate,
  getAll,
  getRenterByRoom,
  getBill,
};
