const db = require('../config/db');

const commentModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM comment`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (limit,offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM comment LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detailComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  inputComment: (id, idRecipe, comment, idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO comment(id, recipe_id, comment, user_id) 
        VALUES (${id}, ${idRecipe}, '${comment}', ${idUser})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateComment: (id, idRecipe, comment, idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE comment SET recipe_id=${idRecipe}, comment='${comment}', user_id=${idUser} WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM comment WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  comment: (idRecipe)=>{
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment WHERE recipe_id=${idRecipe}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
};

module.exports = commentModel;
