const authModel = require("../models/auth.model"); // import authModel dari folder model
const { success, failed, successWithToken } = require("../helpers/response"); // import response dari folder helper
const bcrypt = require("bcrypt"); // import package bcrypt
const jwtToken = require("../helpers/generateJwtToken");

module.exports = {
  register: async (req, res) => {
    // buat fungsi
    try {
      // buat try untuk pengecekan ada error
      const file = req.file.filename;
      const { id, photo, name, email, phone, password, level, isActive } =
        req.body; // destructive body
      bcrypt.hash(password, 10, (err, hash) => {
        // ubah password jadi hash dengan bcrypt.hash(password kamu, default 10, cb (err,hash)=>{})
        if (err) {
          // cek jika err
          failed(res, err.message, "failed", "failed hash password"); // tampilan jika err
        }
        const data = {
          // buat variabel menyimpan parameter dan
          photo: file,
          name,
          email,
          phone,
          password: hash,
          level, // mengganti password dengan hash
          isActive,
        };
        authModel
          .inputAuth(data) // panggil fungsi dengan parameter yang sudah ganti di model
          .then((result) => {
            // menangkap resolve dari model
            success(res, result, "success", "success to register"); // tampilan resolve
          })
          .catch((err) => {
            // menangkap reject dari model
            failed(res, err.message, "failed", "failed to register"); // tampilan reject
          });
      });
    } catch (err) {
      // tangkap hasil dari try jika ada error
      failed(res, err.message, "failed", "internal server error"); // tampilan error
    }
  },
  //   login: async (req, res) => {
  //     try {
  //       const { email, password } = req.body;
  //       const data = await authModel.getData(email);
  //       if (data.rowCount != 1) {
  //         return failed(
  //           res,
  //           "the email is wrong, please enter the correct one",
  //           "failed",
  //           "failed to login"
  //         );
  //       }
  //       bcrypt.compare(password, data.rows[0].password, (err, result) => {
  //         if (result == false) {
  //           return failed(
  //             res,
  //             "the password is wrong, please enter the correct one",
  //             "failed",
  //             "failed to login"
  //           );
  //         }
  //         authModel
  //           .getData(email)
  //           .then((result) => {
  //             success(res, result.rows[0], "success", "login success");
  //           })
  //           .catch((err) => {
  //             failed(res, err.message, "failed", "login failed");
  //           });
  //       });
  //     } catch (err) {
  //       failed(res, err.message, "failed", "internal server error");
  //     }
  //   },
  login: async (req, res) => {
    // buat fungsi
    try {
      // buat try untuk pengecekan ada error
      const { email, password } = req.body; // destructive body
      authModel
        .getData(email) // panggil fungsi yang ada di models
        .then((result) => {
          // menangkap resolve dari model
          if (result.rows[0].is_active == 0) {
            throw Error("your account get suspend please contact admin");
          } else if (result.rowCount > 0) {
            // cek hasil rowcount > 0
            bcrypt
              .compare(password, result.rows[0].password)
              .then(async (match) => {
                // membandingkan password yang dimasukan user (req.body) dengan password yang ada di db (fungsi)
                if (match) {
                  // cek result
                  const { id, name, email, level,photo } = result.rows[0];
                  const tokenData = { id, name, email, level,photo };
                  const token = await jwtToken(tokenData);
                  success(res, token, tokenData, "login success"); // jika result success
                } else {
                  // jika result failed
                  failed(res, "error", "failed", "email or password is wrong");
                }
              });
          } else {
            // jika rowcount lebih kecil dari 0 atau 0
            failed(res, "error", "failed", "email or password is wrong");
          }
        })
        .catch((err) => {
          // menangkap reject dari model
          failed(res, err.message, "failed", "login failed"); // menampilkan message
        });
    } catch (err) {
      // tangkap hasil dari try jika ada error
      failed(res, err.message, "failed", "internal server error"); // tampilan error
    }
  },
  list: (req, res) => {
    try {
      const { page, limit } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offset = (pageValue - 1) * limitValue;
      authModel
        .listAll(limitValue, offset)
        .then((result) => {
          success(res, result.rows, "success", "login success");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "internal server error");
        });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
};
