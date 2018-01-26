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
    allPosts: state.allPosts.allPosts
  };
};

class PostList extends React.Component {
  render() {
    const { incrementLikes, allPosts } = this.props;
    return (
      <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {allPosts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikes}
                  key={index}
                  index={index}
                  allPostSection={true}
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
