import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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
  let posts = isAllPostSection ? state.allPosts.allPosts : state.posts.posts;
  return { posts, isAllPostSection };
};

class PostList extends React.Component {
  componentDidMount() {
    const { isAllPostSection, getAllPost, getPost } = this.props;
    if (isAllPostSection) {
      getAllPost();
    } else {
      getPost();
    }
  }

  render() {
    const { incrementLikesAllPost, posts, isAllPostSection } = this.props;
    return <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {posts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikesAllPost}
                  isAllPostSection={isAllPostSection}
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
      </section>;
  }
}

export default connect(mapStateToProps, actions)(PostList);
