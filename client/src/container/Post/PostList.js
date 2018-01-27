import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import PostItem from "../../components/PostItem";
import * as actions from "../../action-creators";
import * as CSSConstant from "../../CSSConstant";

const PostWrapper = styled.section`
  padding: 12px;
  font-family: ${CSSConstant.raleway};
`;

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

class PostList extends React.Component {
  render() {
    const { incrementLikesPost, posts } = this.props;
    return (
      <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {posts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikesPost}
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

export default connect(mapStateToProps, actions)(PostList);
