const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require('../config/config').get(process.env.NODE_ENV);

exports.getUserById = (req, res, next, id) => {
  User.findById({ _id: id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "CANNOT GET USER",
      });
    }

    req.user = user;
    next();
  });
};

exports.signup = (req, res) => {

  const { email } = req.body;
  const user = new User(req.body);
  User.findOne({ email }, (err, oldUser) => {
    if (oldUser) {
      return res.status(400).json({
        error: "USER ALREADY EXISTS",
      });
    }
    if (err) {
      return res.status(400).json({
        error: "SOMETHING WENT WRONG",
      });
    }

    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "USER ADD FAILED",
        });
      }

      return res.json({ message: "Signup successful" });
    });
  });
};

exports.signin = (req, res) => {

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "ACCOUNT DOESNOT EXIST",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "PASSWORD DOESNOT MATCH",
      });
    }

    const expireTime = Date.now() + 1800000; // expires in 1/2 hour
    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: expireTime,
    });

    return res.json({
      token,
      user,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signed out ",
  });
};

exports.signedIn = expressJwt({
  secret: config.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let flag;
  flag = req.auth && req.user && req.auth.id == req.user._id; // since both ids are of different types, check only the value and hence use "=="

  if (!flag) {
    return res.status(401).json({
      error: "RESTRICTED ACTION",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  let flag;
  flag =
    req.auth &&
    req.user &&
    (req.auth.id == req.user._id) && (req.user.role === "ADMIN");
  if (!flag) {
    return res.status(401).json({
      error: "NOT AN ADMIN",
    });
  }
  next();
};