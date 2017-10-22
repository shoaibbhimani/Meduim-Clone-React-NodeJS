import React from "react";
import { connect } from "react-redux";

import PostItem from "../components/postitem.js";

class Posts extends React.Component {
	componentDidMount() {
		this.props.loadPosts();
	}
	render() {
		const { posts } = this.props;
		return (
			<section>
				<ul>
					{posts.map((post, index) => (
						<PostItem key={index} post={post} />
					))}
				</ul>
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
