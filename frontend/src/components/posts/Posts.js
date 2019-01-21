import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";

import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {loading ? <Spinner /> : <PostFeed posts={posts} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
