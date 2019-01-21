import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { deletePost, likePost, unlikePost } from "../../actions/postActions";

const PostItem = props => {
  const { post } = props;
  const userLikedPost =
    typeof post.likes.find(like => like.user === props.auth.user.id) !==
    "undefined";

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.authorname}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          {!props.showActions ? null : (
            <div>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={
                  userLikedPost
                    ? () => props.unlikePost(props.post._id)
                    : () => props.likePost(props.post._id)
                }
              >
                <i
                  className={classnames("text-info fas fa-thumbs-up", {
                    "post-not-liked": !userLikedPost
                  })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>

              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === props.auth.user.id ? (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={() => props.deletePost(post._id)}
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem);
