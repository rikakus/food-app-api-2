const express = require("express");
const {
  list,
  detail,
  update,
  deleted,
  active,
} = require("../controllers/users.controller");
const { isAdmin } = require("../middleware/authorization");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();

router
  .get("/users", jwtAuth, isAdmin, list)
  .get("/users/:id",jwtAuth, detail)
  .put("/users/:id", jwtAuth, update)
  .delete("/users/:id",jwtAuth, deleted)
  .put("/users-active/:id", jwtAuth, active)
module.exports = router;
