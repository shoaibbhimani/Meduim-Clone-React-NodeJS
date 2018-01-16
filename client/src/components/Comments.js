import React from "react";
import styled from "styled-components";

import commentsIcon from "../svg-icons/comment.svg";

const CommentIcon = styled.span`
  & img {
    width: 20px;
    height: 20px;
  }
`;

const Comments = ({ post }) => (
  <section
    style={{
      float: "right"
    }}
  >
    <CommentIcon>
      <img src={commentsIcon} />
    </CommentIcon>
    <span style={{ marginLeft: "2.5px" }}>{post.comments.length}</span>
  </section>
);

export default Comments;
