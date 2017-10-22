import React from "react";
import { connect } from "react-redux";

import PostItem from "../components/postitem.js";

class PostsDetails extends React.Component {
	render() {
		const { match, posts } = this.props;
		const postid = parseInt(match.params.postid, 10);
		const post = posts.filter(post => post.id === postid)[0];
		return <section>{post.title}</section>;
	}
}

const mapStateToProps = state => {
	return {
		posts: state.posts
	};
};

export default connect(mapStateToProps, null)(PostsDetails);
