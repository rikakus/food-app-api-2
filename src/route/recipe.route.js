const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const {
  list,
  detail,
  input,
  update,
  deleted,
  news,
  recipe,
} = require("../controllers/recipe.controller");
const router = express.Router();

router
  .get("/recipe", list) //?search= to search by title
  .get("/recipe/:id",jwtAuth, detail)
  .post("/recipe",jwtAuth, input)
  .put("/recipe/:id",jwtAuth, update)
  .delete("/recipe/:id",jwtAuth, deleted)
  .get("/recipe-news", news)
  .get("/recipe-user/:id",jwtAuth, recipe);
module.exports = router;
