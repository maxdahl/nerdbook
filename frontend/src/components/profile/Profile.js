import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredentials from "./ProfileCredentials";
import ProfileGithub from "./ProfileGithub";

import Spinner from "../common/Spinner";
import NotFound from "../common/NotFound";

import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentWillMount() {
    const handle = this.props.match.params.handle;
    this.props.getProfileByHandle(handle);
  }

  render() {
    const { profile, loading } = this.props.profile;

    if (loading) return <Spinner />;
    if (profile === null) return <NotFound />;

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <Link
                    to="/profiles"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-md6" />
              </div>

              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCredentials
                education={profile.education}
                experience={profile.experience}
              />
              {profile.githubusername ? (
                <ProfileGithub username={profile.githubusername} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
