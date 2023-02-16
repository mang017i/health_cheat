const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const UserService = require("../../services/User");
const Users = new UserService();
const { errorResponse } = require("../../helpers/index");

verifyToken = (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) {
    errorResponse(req, res, "No token provided !", 403);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      errorResponse(req, res, "Unauthorized !", 401);
    }
    req.body.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) {
    errorResponse(req, res, "No token provided !", 403);
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      errorResponse(req, res, err, 401);
    }
    Users.findOne(decoded.id).then((user) => {
      if (user) {
        if (user.role_id === 2) {
          next();
          return;
        }
        errorResponse(req, res, "Require Admin Role !", 403);
        return;
      } else {
        errorResponse(req, res, `User not found with id : ${decoded.id}`, 404);
      }
    });
  });
};

ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/auth/login");
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  ensureAuthenticated: ensureAuthenticated,
};

module.exports = authJwt;
