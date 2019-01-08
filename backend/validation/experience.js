const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
