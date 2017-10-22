import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import PostItem from "../components/PostItem";

const PostWrapper = styled.section`padding: 12px;`;

class Posts extends React.Component {
	componentDidMount() {
		this.props.loadPosts();
	}
	render() {
		const { posts } = this.props;
		return (
			<section className="row">
				<section className="col-md-7">
					<PostWrapper>
						<ul>
							{posts.map((post, index) => (
								<PostItem key={index} post={post} />
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

const mapDispatchToProps = () => {
	return {
		loadPosts: () => {
			return [];
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
