import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  getCurrentProfile,
  deleteAccount,
  deleteExperience,
  deleteEducation
} from "../../actions/profileActions";
import isEmpty from "../../utils/isEmpty";

import ProfileActions from "./ProfileActions";
import Spinner from "../common/Spinner";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteAccountClick = e => {
    this.props.deleteAccount();
  };

  getProfile = profile => {
    if (isEmpty(profile)) {
      return (
        <div>
          <p className="lead text-muted">
            Welcome, {this.props.auth.user.name}
          </p>
          <p>
            You have not setup a profile yet. Please provide some info about
            your self
          </p>
          <Link to="create-profile" className="btn btn-large btn-info">
            Create Profile
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <p className="lead text-muted">
            Welcome,{" "}
            <Link to={`/profile/${profile.handle}`}>
              {this.props.auth.user.name}
            </Link>
          </p>

          <ProfileActions />
          <Experience
            experience={profile.experience}
            deleteExperience={this.props.deleteExperience}
          />

          <Education
            education={profile.education}
            deleteEducation={this.props.deleteEducation}
          />

          <div style={{ marginBottom: "60px" }}>
            <button
              onClick={this.onDeleteAccountClick}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    const { profile, loading } = this.props.profile;

    const dashboardContent =
      profile === null || loading ? <Spinner /> : this.getProfile(profile);

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, deleteExperience, deleteEducation }
)(Dashboard);
