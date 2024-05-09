const createASchedule =
  "INSERT INTO bookCalendar (user_id, name, date,user_name, phone, note) VALUES ($1,$2,$3,$4,$5, $6)";

const getAllSchedules = `select * from bookCalendar where date in 
(select date from bookCalendar where isAccept = true and date >= CURRENT_DATE group by (date) order by date)`;

const getScheduleResult =
  "SELECT result FROM bookCalendar WHERE user_id = $1,name = $2, date = $3";

const getScheduleByUserId = "SELECT * FROM bookCalendar WHERE user_id = $1";

const queueSchedules =
  "select * from bookCalendar where isAccept = false and result is null and date >= CURRENT_DATE";

const updateScheduleResult = `UPDATE bookCalendar SET isAccept = true, result = $1 
                              WHERE id = $2`;

module.exports = {
  createASchedule,
  getAllSchedules,
  getScheduleResult,
  getScheduleByUserId,
  queueSchedules,
  updateScheduleResult,
};
