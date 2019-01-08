const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  if (isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (isEmpty(data.field)) {
    errors.field = "Field of studies is required";
  }

  if (isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
