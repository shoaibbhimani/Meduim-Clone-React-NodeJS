import React from "react";
import styled from "styled-components";

const PostUserInfo = styled.section`
  padding: 4px;
  width: 100%;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
`;

const UserName = styled.section`
  margin-left: 4px;
  float: left;
`;

const PostHeader = ({ postauthor }) => (
  <PostUserInfo className="clearfix">
    <UserImage src={postauthor.avatar} />
    <UserName>{postauthor.firstName}</UserName>
  </PostUserInfo>
);

export default PostHeader;
