import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PostHeader from "./PostHeader";

const PostItemWrapper = styled.li`display: inline;`;

const PostTitle = styled.section`
	font-size: 27px;
	text-align: left;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`float: left;`;

const PostExcerpt = styled.section`text-align: left;`;
const PostLink = styled.section`text-align: left;`;

const PostItem = ({ post }) => (
	<PostItemWrapper>
		<PostHeader post={post} />
		{post.thumbnail && (
			<PostImageWrapper className="clearfix">
				<PostImage
					src={`https://cdn-images-1.medium.com/fit/t/800/240/1*jVnqkmLgnIbuVlFYl5-T_Q.png`}
				/>
			</PostImageWrapper>
		)}

		<PostTitle>{post.title}</PostTitle>
		<PostExcerpt>{post.excerpt}</PostExcerpt>
		<PostLink>
			<Link to={`/${post.id}`}>
				<p>Read more</p>
			</Link>
		</PostLink>
		<section className="clearfix">
			<section
				style={{
					float: "left"
				}}
			>
				{post.likes}
			</section>
			<section
				style={{
					float: "right"
				}}
			>
				{post.comments.length}
			</section>
		</section>

		<hr />
	</PostItemWrapper>
);

export default PostItem;
