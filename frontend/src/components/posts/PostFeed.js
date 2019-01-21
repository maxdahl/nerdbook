import React from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
  const postItems = posts.map(post => {
    return <PostItem key={post._id} post={post} showActions />;
  });

  return <div className="posts">{postItems}</div>;
};

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
