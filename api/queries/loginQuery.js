const createUser = `INSERT INTO Users (Email, Password, Name, Dob, Gender,University,isHost, isRenter) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8) `;

const checkUser = "SELECT Password FROM Users WHERE Email = $1";

module.exports = { createUser, checkUser };
