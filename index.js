const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const usersRoute = require("../recipe backend/src/route/users.route");
const recipeRoute = require("../recipe backend/src/route/recipe.route");
const commentRoute = require("../recipe backend/src/route/comment.route");
const authRoute = require("../recipe backend/src/route/auth.route");
const app = express();
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(usersRoute);
app.use(recipeRoute);
app.use(commentRoute);
app.use(authRoute);
app.use(express.static(path.join(__dirname, "public")));

const APP_PORT = process.env.PORT || 3003
app.listen(APP_PORT, () => {
  console.log(`service running on PORT ${APP_PORT}`);
});
