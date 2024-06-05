const getAllUsers =
  "SELECT * FROM Users WHERE isHost = false and isRenter = false";
const getAdmin = "SELECT * FROM Users WHERE isHost = true";
const getAllRenters = "SELECT * FROM Users WHERE isRenter = true";
const getUser = "SELECT * FROM Users WHERE id = $1";
const updateToRenter = `UPDATE users
                        SET isRenter = NOT isRenter
                        WHERE id = $1;`;
const updateUserEP = `UPDATE Users
                    SET Email = $1, Password = $2 
                    WHERE id = $3`;
const updateUser = `UPDATE Users
                    SET Name = $1, Dob = $2, Gender = $3, University = $4
                    WHERE id = $5`;
const deleteUser = "DELETE FROM users WHERE id = $1 AND isRenter = false";

module.exports = {
  getAllUsers,
  getAdmin,
  getAllRenters,
  getUser,
  updateToRenter,
  updateUserEP,
  updateUser,
  deleteUser,
};
