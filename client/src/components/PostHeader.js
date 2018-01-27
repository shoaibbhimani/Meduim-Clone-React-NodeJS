import React from "react";
import styled from "styled-components";

import * as CSSConstant from "../CSSConstant";

const PostUserInfo = styled.section`
  padding: 4px;
  margin-top: 16px;
  width: 100%;
  font-family: ${CSSConstant.raleway};
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
  border: 3px solid #d7d7d7;
`;

const UserName = styled.section`
  margin-left: 4px;
  float: left;
  padding: 4px;

  & span:first-of-type {
   font-size: 16px;
  }

  & span:last-of-type {
    color: #939393;
    font-size: 14px;
  }
`;

const PostHeader = ({ postauthor }) => (
  <PostUserInfo className="clearfix">
    <UserImage src={postauthor.avatar} />
    <UserName>
      <span>{postauthor.firstName} </span> <br />
      <span>{postauthor.email}</span>
    </UserName>
  </PostUserInfo>
);

export default PostHeader;
