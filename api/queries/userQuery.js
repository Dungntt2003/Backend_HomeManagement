const getAllUsers = "SELECT * FROM Users WHERE isHost = false";
const getAdmin = "SELECT * FROM Users WHERE isHost = true";
const getAllRenters = "SELECT * FROM Users WHERE isRenter = true";
const updateToRenter = `UPDATE users SET isRenter = CASE 
                            WHEN isRenter = false THEN true 
                            WHEN isRenter = true THEN false 
                            END 
                        WHERE isHost = false AND id = $1`;

const deleteUser = "DELETE USER FROM users WHERE id = $1 AND isRenter = false";

module.exports = {
  getAllUsers,
  getAdmin,
  getAllRenters,
  updateToRenter,
  deleteUser,
};
