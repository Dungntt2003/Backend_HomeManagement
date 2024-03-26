const getAllUsers = "SELECT * FROM Users WHERE isHost = false";
const getAdmin = "SELECT * FROM Users WHERE isHost = true";
const getAllRenters = "SELECT * FROM Users WHERE isRenter = true";
const getUser = "SELECT * FROM Users WHERE id = $1";
const createUser = `INSERT INTO Users (Email, Password, Name, Dob, Gender,isHost, isRenter) 
                    VALUES($1, $2, $3, $4, $5, $6, $7) `;
const updateToRenter = `UPDATE users SET isRenter = CASE 
                            WHEN isRenter = false THEN true 
                            WHEN isRenter = true THEN false 
                            END 
                        WHERE isHost = false AND id = $1`;
const updateUserEP = `UPDATE table_name
                    SET Email = $1, Password = $2 
                    WHERE id = $3`;
const updateUser = `UPDATE table_name
                    SET Name = $1, Dob = $2, Gender = $3, University = $4
                    WHERE id = $5`;
const deleteUser = "DELETE FROM users WHERE id = $1 AND isRenter = false";

module.exports = {
  getAllUsers,
  getAdmin,
  getAllRenters,
  getUser,
  createUser,
  updateToRenter,
  updateUserEP,
  updateUser,
  deleteUser,
};
