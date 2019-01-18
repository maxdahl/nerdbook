import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  getProfileItems = () => {
    const { profiles, loading } = this.props.profile;

    if (profiles === null || loading) {
      return <Spinner />;
    } else {
      if (profiles.length > 0) {
        return profiles.map(profile => {
          return <ProfileItem key={profile._id} profile={profile} />;
        });
      } else {
        return <h4>No Profiles Found</h4>;
      }
    }
  };

  render() {
    const profileItems = this.getProfileItems();

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text center">Developer Profiles</h1>
              <p className="lead text-center">Connect with fellow developers</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
