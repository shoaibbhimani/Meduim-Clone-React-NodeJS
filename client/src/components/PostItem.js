//packages
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";

//Components
import PostHeader from "./PostHeader";

//Icons
import likesIcon from "../svg-icons/like.svg";
import commentsIcon from "../svg-icons/comment.svg";

const PostItemWrapper = styled.li`display: inline;`;

const PostTitle = styled.section`
	font-size: 27px;
	text-align: left;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`float: left;`;

const PostExcerpt = styled.section`text-align: left;`;
const PostLink = styled.section`text-align: left;`;

const LikeIcon = styled.span`
	& img {
		width: 20px;
		height: 20px;
	}
`;

const CommentIcon = styled.span`
	& img {
		width: 20px;
		height: 20px;
	}
`;

const PostItem = ({ post, incrementLikes, index }) => {
	const likeIconHandler = () => {
		incrementLikes({ index });
	};
	return (
		<PostItemWrapper>
			<PostHeader post={post} />
			{post.thumbnail && (
				<PostImageWrapper className="clearfix">
					<PostImage
						className="img-responsive"
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
					onClick={likeIconHandler}
				>
					<LikeIcon>
						<img src={likesIcon} />
					</LikeIcon>
					<span style={{ marginLeft: "2.5px" }}>{post.likes}</span>
				</section>
				<section
					style={{
						float: "right"
					}}
				>
					<CommentIcon>
						<img src={commentsIcon} />
					</CommentIcon>
					<span style={{ marginLeft: "2.5px" }}>
						{post.comments.length}
					</span>
				</section>
			</section>

			<hr />
		</PostItemWrapper>
	);
};

PostItem.propTypes = {
	incrementLikes: t.func.isRequired,
	post: t.object.isRequired
};

export default PostItem;
