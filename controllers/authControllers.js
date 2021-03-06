const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = {
    email: "",
    password: "",
  };
  //duplicate error code
  if (err.code == 11000) {
    errors.email = "that mail is already registered";
  }

  //validattion error code
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  //error message
  if (err.message === "incorrect email") {
    errors.email = "incorrect email";
  }

  if (err.message === "incorrect password") {
    errors.password = "incorrect password";
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "sign up secret str", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json(user._id);
  } catch (err) {
    let errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.cookie("userEmail", email, { maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.id });
  } catch (err) {
    let errors = handleError(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
