import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Switch, withRouter, Route, Link } from "react-router-dom";

//Components
import PostItem from "../../components/PostItem";
import EditBlog from "../EditBlog";
import PostList from "./PostList";
import PostDetails from "../PostDetails";

//Action Creators
import * as actions from "../../action-creators";
import PrivateRoute from "../../UIComponent/PrivateRoute";

const mapStateToProps = state => {
  return {
    posts: state.allPosts.allPosts,
    isAuthenticated: state.user.isAuthenticated,
    isPostLoading: state.allPosts.isLoading
  };
};

class Posts extends React.Component {
  componentDidMount() {
    this.props.getAllPost();
  }

  render() {
    const {
      posts,
      isPostLoading,
    } = this.props;

    console.log(isPostLoading)
    if (isPostLoading) {
      return null;
    }

    return (
      <section>
        <Switch>
          <Route exact path="/allblog" component={PostList} />
          <Route exact path="/allblog/:postId" component={PostDetails} />
        </Switch>
      </section>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(Posts));
