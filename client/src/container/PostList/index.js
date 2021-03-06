import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import qs from "qs";

import PostItem from "../../components/PostItem";
import * as actions from "../../action-creators";
import PostList from "./PostList";
import PostDetails from "../PostDetails";
import CreatePost from "../CreateEditPost";

const PostListWrapper = styled.section`
  font-family: ${props => props.theme.raleway};
  background: #fafafa;
  min-height: 100vh;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.posts.isLoading,
    allPostSection: ownProps.location.pathname.indexOf("/myblogs") === -1
  };
};

class Posts extends React.Component {
  componentDidMount() {
    const { allPostSection, getAllPost, getPost, match, location } = this.props;

    const parsed = qs.parse(location.search.slice(1));

    if (allPostSection) {
      getAllPost({ tag: parsed.tag });
    } else {
      getPost({ tag: parsed.tag });
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
            component={CreatePost}
          />
        </Switch>
      </PostListWrapper>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(Posts));
