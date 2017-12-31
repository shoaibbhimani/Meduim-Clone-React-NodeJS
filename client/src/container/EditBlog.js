import React,{ Component } from 'react';
import { connect } from "react-redux"

const mapStateToProps = state => {
	return {
			posts: state.posts
	}
}

class EditBlog extends Component {
	render(){
	  const { location, posts } = this.props;
		const index = parseInt(location.pathname.split('/').pop());
		const post = posts[index]
		return (
			  <section>{post.title}</section>
		)
	}
}

export default connect(mapStateToProps)(EditBlog);
