const db = require("../config/db");

const recipeModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM recipe`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (search,limit,offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detailRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  inputRecipe: (id, photo, title, ingredients, video, date, idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipe(id, photo, title, ingredients, video, date, user_Id) 
        VALUES (${id}, '${photo}', '${title}','${ingredients}', '${video}', '${date}', '${idUser}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateRecipe: (id, photo, title, ingredients, video, date, idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe SET photo='${photo}', title='${title}',ingredients='${ingredients}'
            , video='${video}', date='${date}', user_id='${idUser}' WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipe WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  newRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe ORDER BY date DESC LIMIT 6`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  recipeUser: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE user_id=${idUser}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = recipeModel;
