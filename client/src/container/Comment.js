import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as t from "prop-types";

import CommentItem from "../components/CommentItem";

const CommentContainer = styled.section`
  width: 95%;
  margin: 12px auto;
`;

class Comments extends React.Component {
  render() {
    const {
      comments,
      postIndex,
      editCreateComment,
      post,
      user_id
    } = this.props;
    return (
      <CommentContainer>
        {comments.map((commentsItem, index) => (
          <CommentItem
            editCreateComment={editCreateComment}
            key={index}
            user_id={user_id}
            post={post}
            commentsItem={commentsItem}
          />
        ))}
      </CommentContainer>
    );
  }
}

Comments.propTypes = {
  comments: t.array.isRequired,
  addComments: t.func.isRequired,
  postIndex: t.number.isRequired,
  post: t.object.isRequired
};

export default Comments;
