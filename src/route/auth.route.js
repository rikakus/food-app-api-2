const express = require("express");
const { register, login, list } = require("../controllers/auth.controller");
const { body, validationResult } = require("express-validator");

const router = express.Router();
// const authStatic = require('../middleware/staticAuth')
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isCustomer } = require("../middleware/authorization");
const upload = require("../middleware/upload");
const { validate, userValidationRules } = require("../middleware/validation");
router
  .get("/newusers", jwtAuth, isCustomer, list)
  //  .post("/register", userValidationRules(), validate, register)
  .post("/register", upload, register)
  .post("/login", login);

module.exports = router;
