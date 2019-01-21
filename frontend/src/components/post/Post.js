import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";

import { getPost } from "../../actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    const postContent =
      loading || post === null ? (
        <Spinner />
      ) : (
        <PostItem post={post} showActions={false} />
      );

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
