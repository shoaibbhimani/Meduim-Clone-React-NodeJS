import React from "react";
import { connect } from "react-redux";
import { Switch, withRouter, Route, } from "react-router-dom";

//Components
import EditBlog from "../EditBlog";
import PostList from "./PostList";
import PostDetails from "../PostDetails";

//Action Creators
import * as actions from "../../action-creators";

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    isAuthenticated: state.user.isAuthenticated,
    isPostLoading: state.posts.isLoading
  };
};

class Posts extends React.Component {
  componentDidMount() {
    this.props.getPost();
  }

  render() {
    const { isPostLoading } = this.props;

    if (isPostLoading) {
      return null;
    }

    return (
      <section>
        <Switch>
          <Route exact path="/myblogs" component={PostList} />
          <Route exact path="/myblogs/:postId" component={PostDetails} />
          <Route exact path="/myBlogs/editBlog/:postId" component={EditBlog} />
        </Switch>
      </section>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(Posts));
