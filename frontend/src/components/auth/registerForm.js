const registerForm = {
  name: {
    type: "input",
    showLabel: false,
    validation: {
      required: true
    },
    attributes: {
      className: "form-control form-control-lg",
      type: "text",
      placeholder: "Name"
    }
  },
  email: {
    type: "input",
    showLabel: false,
    validation: {
      required: true
    },
    attributes: {
      className: "form-control form-control-lg",
      type: "email",
      placeholder: "Email Address"
    }
  },
  password: {
    type: "input",
    showLabel: false,
    validation: {
      required: true
    },
    attributes: {
      className: "form-control form-control-lg",
      type: "password",
      placeholder: "Password"
    }
  },
  password2: {
    type: "input",
    showLabel: false,
    validation: {
      required: true
    },
    attributes: {
      className: "form-control form-control-lg",
      type: "password",
      placeholder: "Confirm Password"
    }
  },
  submit: {
    type: "button",
    label: "Submit",
    showLabel: false,
    attributes: {
      className: "btn btn-info btn-block mt-4"
    }
  }
};

export default registerForm;
