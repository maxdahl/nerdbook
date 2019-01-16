const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = isEmpty(data.handle) ? "" : data.handle;
  data.skills = isEmpty(data.skills) ? "" : data.skills;
  data.status = isEmpty(data.status) ? "" : data.status;

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Please fill out your skills";
  }

  const socialNetworks = [
    "website",
    "youtube",
    "twitter",
    "facebook",
    "instagram",
    "linkedin"
  ];

  socialNetworks.forEach(network => {
    if (!isEmpty(data[network]) && !validator.isURL(data[network])) {
      errors[network] = "Please enter a valid URL";
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
