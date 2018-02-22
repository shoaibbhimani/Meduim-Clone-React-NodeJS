import React from "react";
import { connect } from "react-redux";
import { Switch, withRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";

//Components
import PostList from "./PostList";
import PostDetails from "../PostDetails";
import * as actions from "../../action-creators";
import EditBlog from "../EditBlog";

const mapStateToProps = state => {
  return {
    posts: state.allPosts.allPosts,
    isAuthenticated: state.user.isAuthenticated,
    isPostLoading: state.allPosts.isLoading
  };
};

class Posts extends React.Component {
  render() {
    return <section>
        <Switch>
          <Route exact path="/allblog" component={PostList} />
          <Route exact path="/allblog/:postId" component={PostDetails} />
          <Route exact path="/myblogs" component={PostList} />
          <Route exact path="/myblogs/:postId" component={PostDetails} />
          <Route exact path="/myBlogs/editBlog/:postId" component={EditBlog} />
        </Switch>
      </section>;
  }
}

export default withRouter(connect(mapStateToProps, actions)(Posts));
