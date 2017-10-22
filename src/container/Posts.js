import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//Components
import PostItem from "../components/PostItem";

//Action Creators
import { incrementLikes } from "../action-creators/post-action-creator.js";

const PostWrapper = styled.section`padding: 12px;`;

class Posts extends React.Component {
	render() {
		const { posts, incrementLikes } = this.props;
		return (
			<section className="row">
				<section className="col-md-7">
					<PostWrapper>
						<ul>
							{posts.map((post, index) => (
								<PostItem
									incrementLikes={incrementLikes}
									key={index}
									index={index}
									post={post}
								/>
							))}
						</ul>
					</PostWrapper>
				</section>
				<section className="col-md-5">
					About this website and post
				</section>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.posts
	};
};

export default connect(mapStateToProps, { incrementLikes })(Posts);
