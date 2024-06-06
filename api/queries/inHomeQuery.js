const insertNewRenter =
  "INSERT INTO inRoom (room_id, user_id, startDate, endDate) VALUES ($1,$2,$3,$4)";

const updateRenterDate = "UPDATE inRoom SET endDate = $1 where id = $2";

module.exports = {
  insertNewRenter,
  updateRenterDate,
};
