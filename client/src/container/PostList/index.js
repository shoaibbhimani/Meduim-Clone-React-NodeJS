import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";

import PostItem from "../../components/PostItem";
import * as actions from "../../action-creators";
import * as CSSConstant from "../../CSSConstant";
import PostList from "./PostList";
import PostDetails from "../PostDetails";
import EditBlog from "../EditBlog";

const PostListWrapper = styled.section`
  font-family: ${CSSConstant.raleway};
  background: #fafafa;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.posts.isLoading,
    allPostSection: ownProps.location.pathname.indexOf("/myblogs") === -1
  };
};

class Posts extends React.Component {
  componentDidMount() {
    const { allPostSection, getAllPost, getPost } = this.props;

    if (allPostSection) {
      getAllPost();
    } else {
      getPost();
    }
  }

  render() {
    const { match, isLoading } = this.props;

    if (isLoading) {
      return <div>Loading......</div>;
    }

    return (
      <PostListWrapper>
        <Switch>
          <Route exact path={`${match.url}`} component={PostList} />
          <Route exact path={`${match.url}/:postId`} component={PostDetails} />
          <Route
            exact
            path={`${match.url}/editblog/:postId`}
            component={EditBlog}
          />
        </Switch>
      </PostListWrapper>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(Posts));
