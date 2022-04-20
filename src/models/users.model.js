const db = require('../config/db');

const usersModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM users`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (limit,offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  detailUsers: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  updateUser: (id, photo, name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo='${photo}', name='${name}',email='${email}'
            , phone='${phone}', password='${password}' WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  activeUser: (id, isActive) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET is_active=${isActive} WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = usersModel;
