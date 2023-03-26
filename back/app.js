const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
// const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

///////////////////////////
dotenv.config();
require("./src/config/sequelize.config");

const app = express();

// SESSION MANAGER
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:8000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Origin",
      "Accept",
      "X-Requested-With",
      "Access-Control-Request-Method",
    ],
  })
);
app.use(bodyParser.json());

// AUTHORISATION FOR PICTURE
app.use(express.static(path.join(__dirname, "public")));
global.__basedir = __dirname;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: "Welcome to HealthCheat Server." });
  // res.send(
  //   "<div><button><a href='/api/auth/google'>Login With Google</a></button><button><a href='/api/auth/google/logout'>Logout Google</a></button><button><a href='/api/auth/microsoft'>Login With Microsoft</a></button><button><a href='/api/auth/microsoft/logout'>Logout Microsoft</a></button></div>"
  // );
});

// DECLARE ROUTES
require("./src/routes/User")(app);
require("./src/routes/Auth")(app);
require("./src/routes/Role")(app);
require("./src/routes/Cheat")(app);
require("./src/routes/Bookmark")(app);
require("./src/routes/Category")(app);
require("./src/routes/Material")(app);
require("./src/routes/Equipment")(app);
require("./src/routes/Picture")(app);

module.exports = app;
