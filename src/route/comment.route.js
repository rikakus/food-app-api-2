const express = require("express");
const {
  list,
  detail,
  input,
  update,
  deleted,
  commentRecipe,
} = require("../controllers/comment.controller");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();
const authStatic = require("../middleware/staticAuth");
const { isAdmin } = require("../middleware/authorization");

router
  .get("/comment", jwtAuth,isAdmin, list)
  .get("/comment/:id", jwtAuth, detail)
  .post("/comment", jwtAuth, input)
  .put("/comment/:id", jwtAuth, update)
  .delete("/comment/:id", jwtAuth, deleted)
  .get("/commentrecipe/:id", jwtAuth, commentRecipe);
module.exports = router;
