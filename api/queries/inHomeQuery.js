const insertNewRenter =
  "INSERT INTO inRoom (room_id, user_id, startDate, endDate) VALUES ($1,$2,$3,$4)";

const updateRenterDate = "UPDATE inRoom SET endDate = $1 where id = $2";
const stopRenter = "UPDATE inRoom SET endDate = CURRENT_DATE WHERE id = $1";
const getAll = "SELECT * FROM inRoom";
const getRenterByRoom =
  "SELECT * FROM users join inRoom on inRoom.user_id = users.id where room_id = $1 and endDate > CURRENT_DATE";
const getBill = "SELECT * FROM bill WHERE room_id = $1";
const updateBill =
  "UPDATE bill SET post_date = CURRENT_DATE, ispay = true WHERE id = $1";
const createBill = "select insert_bills()";
const getRenterDetail = `select * from (inRoom join users on inRoom.user_id = users.id)
                          where room_id = (select room_id from inRoom where user_id = $1);`;
const getBillDetail = `select * from bill where room_id = (select room_id from inRoom where user_id = $1);`;
module.exports = {
  insertNewRenter,
  updateRenterDate,
  getAll,
  getRenterByRoom,
  getBill,
  stopRenter,
  updateBill,
  createBill,
  getRenterDetail,
  getBillDetail,
};
