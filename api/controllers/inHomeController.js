const pool = require("../../db");

const {
  insertNewRenter,
  updateRenterDate,
  // getAll,
  getRenterByRoom,
  getBill,
} = require("../queries/inHomeQuery");

const { getAllHome } = require("../queries/homeQuery");

const addRenter = (req, res, next) => {
  const { room_id, user_id, startDate, endDate } = req.body;
  pool.query(
    insertNewRenter,
    [room_id, user_id, startDate, endDate],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Created successfully",
        });
      }
    }
  );
};

const updateRenter = (req, res, next) => {
  const endDate = req.body.endDate;
  const id = req.params.id;
  pool.query(updateRenterDate, [endDate, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Updated successfully",
      });
  });
};

const getAllInfos = async (req, res, next) => {
  try {
    const result = await pool.query(getAllHome);

    const data = await Promise.all(
      result.rows.map(async (item) => {
        const renters = await pool.query(getRenterByRoom, [item.Name]);
        const bills = await pool.query(getBill, [item.Name]);
        return {
          room_id: item.room_id,
          renter: renters.rows.length != 0 ? renters.rows : [],
          bill: bills.rows.length != 0 ? bills.rows : [],
        };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { addRenter, updateRenter, getAllInfos };
