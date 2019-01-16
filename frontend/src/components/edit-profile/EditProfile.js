import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import isEmpty from "../../utils/isEmpty";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubusername: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = {
        ...nextProps.profile.profile,
        skills: nextProps.profile.profile.skills.join(",")
      };

      if (!isEmpty(profile.social)) {
        Object.keys(profile.social).forEach(key => {
          profile[key] = isEmpty(profile.social[key])
            ? ""
            : profile.social[key];
        });
      }

      this.setState(profile);
    }
  }

  onSubmitForm = e => {
    e.preventDefault();

    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      youtube: this.state.youtube
    };

    this.props.createProfile(newProfile, this.props.history);
  };

  onInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  getSocialInputForm = errors => {
    return (
      <div>
        <TextFieldGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          onChange={this.onInputChange}
          value={this.state.facebook}
          error={errors.facebook}
        />

        <TextFieldGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          onChange={this.onInputChange}
          value={this.state.twitter}
          error={errors.twitter}
        />

        <TextFieldGroup
          placeholder="LinkedIn Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          onChange={this.onInputChange}
          value={this.state.linkedin}
          error={errors.linkedin}
        />

        <TextFieldGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          onChange={this.onInputChange}
          value={this.state.youtube}
          error={errors.youtube}
        />

        <TextFieldGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          onChange={this.onInputChange}
          value={this.state.instagram}
          error={errors.instagram}
        />
      </div>
    );
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const statusOptions = [
      { label: "* Select Professional Status", value: null },
      { label: "Full-Stack Developer", value: "Full-Stack Developer" },
      { label: "Backend Developer", value: "Backend Developer" },
      { label: "Frontend Developer", value: "Frontend Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const socialInputs = displaySocialInputs
      ? this.getSocialInputForm(errors)
      : null;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmitForm}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile url"
                />

                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  options={statusOptions}
                  onChange={this.onInputChange}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  error={errors.company}
                  info="The company you currently work at"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onInputChange}
                  error={errors.website}
                  info="Your personal website"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  error={errors.location}
                  info="Where do you live?"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onInputChange}
                  error={errors.skills}
                  info="Please use comma seperated values (eg. JavaScript, PHP, CSS)"
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onInputChange}
                  error={errors.githubusername}
                  info="Include this if you want your latest repos and Github link displayed on your profile"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onInputChange}
                  error={errors.bio}
                  info="Tell us a little bit about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Media Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile);
