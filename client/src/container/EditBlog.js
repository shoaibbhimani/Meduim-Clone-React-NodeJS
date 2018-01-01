import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

class EditBlog extends Component {
  render() {
    const { location, posts } = this.props;
    const index = parseInt(location.pathname.split("/").pop());
    const post = posts[index];
    return <h2> Edit Blog </h2>;
  }
}

export default connect(mapStateToProps)(EditBlog);
