const createASchedule =
  "INSERT INTO bookCalendar (user_id, name, date,user_name, phone, note) VALUES ($1,$2,$3,$4,$5, $6)";

const getAllSchedules = "SELECT * FROM bookCalendar";

const getScheduleResult =
  "SELECT result FROM bookCalendar WHERE user_id = $1,name = $2, date = $3";

module.exports = {
  createASchedule,
  getAllSchedules,
  getScheduleResult,
};
