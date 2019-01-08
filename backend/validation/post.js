const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (!validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = "Your post has to be between 1 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Please write something";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
