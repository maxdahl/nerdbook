import React from "react";

import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  const commentItems = comments.map(comment => {
    return <CommentItem comment={comment} />;
  });

  return <div class="comments">{commentItems}</div>;
};

export default CommentList;
