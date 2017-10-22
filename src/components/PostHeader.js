import React from "react";
import styled from "styled-components";

const PostUserInfo = styled.section``;

const PostHeader = ({ post }) => (
	<PostUserInfo>
		<img src={post.author.avatar} />
		<section>{post.author.name}</section>
	</PostUserInfo>
);

export default PostHeader;
