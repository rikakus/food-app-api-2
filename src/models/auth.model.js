const db = require('../config/db');

const authModel = {
  inputAuth: (data) => {
    return new Promise((resolve, reject) => {
        const {id, photo, name, email, phone, password, level,isActive} = data
        db.query(
            `INSERT INTO users( photo, name, email, phone, password, level, is_active) 
            VALUES ('${photo}', '${name}','${email}', '${phone}', '${password}',${level},${isActive})`,
             (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
   getData: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (limit,offset) => {
        return new Promise((resolve, reject) => {
          db.query(`SELECT * FROM users limit ${limit} offset ${offset}`, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
      },
}

module.exports = authModel