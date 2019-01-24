import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProfileById } from "../../actions/profileActions";

class CommentItem extends Component {
  componentDidMount() {
    this.props.getProfileById(this.props.comment.user);
  }

  render() {
    const { profile } = this.props.profile;
    const comment = this.props.comment;
    const authorName = profile ? (
      <Link to={`/profile/${profile.handle}`}>{comment.authorname}</Link>
    ) : (
      <span>{comment.authorname}</span>
    );

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />

            <br />
            <p className="text-center">{authorName}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileById }
)(CommentItem);
