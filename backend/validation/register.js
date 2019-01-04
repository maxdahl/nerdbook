const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = "Name must be between 2 and 40 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be a valid email";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
