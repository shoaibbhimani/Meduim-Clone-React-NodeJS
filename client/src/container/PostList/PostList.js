import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PostItem from "../../components/PostItem";
import * as actions from "../../action-creators";
import * as CSSConstant from "../../CSSConstant";
import * as UtilityMethod from "../../UtilityMethod";

const PostWrapper = styled.section`
  padding: 12px;
  font-family: ${CSSConstant.raleway};
`;

const mapStateToProps = (state, ownProps) => {
  const isAllPostSection = UtilityMethod.isAllPostSection(ownProps);
  return { posts: state.posts.posts, isAllPostSection };
};

class PostList extends React.Component {
  state = { currentPostSection: "" };

  componentDidMount() {
    this.getPosts(this.props);
  }

  getPosts = ({ isAllPostSection, getAllPost, getPost }) => {
    // const { isAllPostSection, getAllPost, getPost } = this.props;
    let currentPostSection = null;

    if (isAllPostSection) {
      getAllPost();
      currentPostSection = "allPosts";
    } else {
      getPost();
      currentPostSection = "posts";
    }

    this.setState({ currentPostSection });
  };

  componentWillReceiveProps(nextProps) {
    //whether we are on same routes
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getPosts(nextProps);
    }
  }

  render() {
    const { incrementLikesAllPost, posts, match } = this.props;
    const { currentPostSection } = this.state;
    let isAllPostSection = currentPostSection === "allPosts";

    return (
      <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {posts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikesAllPost}
                  isAllPostSection={isAllPostSection}
                  key={index}
                  index={index}
                  post={post}
                />
              ))}
            </ul>
          </PostWrapper>
        </section>
        <section className="col-md-5">About this website and post</section>
      </section>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(PostList));
