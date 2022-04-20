const jwt = require("jsonwebtoken");
const { failed } = require("../helpers/response");

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
        failed(res, 'forbidden access', "must login", "token not found")
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.APP_DATA = {
      tokenDecode: decode,
    };
    next();
  } catch (err) {
    failed(res, err, "failed", "wrong token");
  }
};
