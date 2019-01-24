import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

class Comment extends Component {
  render() {
    return (
      <div>
        <CommentList comments={this.props.post.post.comments} />
        <CommentForm />
      </div>
    );
  }
}

Comment.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(mapStateToProps)(Comment);
