import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import PostHeader from "../components/PostHeader";

const PostsDetailsWrapper = styled.section`
	width: 60%;
	margin: 0 auto;
`;

const PostTitle = styled.section`
	padding: 18px;
	text-align: left;
	font-size: 29px;
`;

const PostImageWrapper = styled.section``;
const PostContent = styled.section`
	margin-top: 9px;
	font-size: 18px;
	text-align: left;
`;

const PostImage = styled.img``;

class PostsDetails extends React.Component {
	render() {
		const { match, posts } = this.props;
		const postid = parseInt(match.params.postid, 10);
		const post = posts.filter(post => post.id === postid)[0];
		return (
			<PostsDetailsWrapper>
				<PostHeader post={post} />
				<PostTitle>{post.title}</PostTitle>
				<section>
					{post.thumbnail && (
						<PostImageWrapper className="clearfix">
							<PostImage
								src={`https://cdn-images-1.medium.com/fit/t/800/240/1*jVnqkmLgnIbuVlFYl5-T_Q.png`}
							/>
						</PostImageWrapper>
					)}
				</section>
				<PostContent>{post.content}</PostContent>
			</PostsDetailsWrapper>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.posts
	};
};

export default connect(mapStateToProps, null)(PostsDetails);
