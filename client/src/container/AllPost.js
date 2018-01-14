import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import PostItem from "../components/PostItem";
import * as actions from "../action-creators";

const PostWrapper = styled.section`
  padding: 12px;
`;

const mapStateToProps = state => {
  return {
    allPosts: state.allPosts.allPosts
  };
};

class AllPost extends React.Component {
  componentDidMount() {
    this.props.getAllPost();
  }
  render() {
    const { allPosts, incrementLikes } = this.props;
    return (
      <section className="col-md-7">
        <PostWrapper>
          All Posts
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
    );
  }
}

export default connect(mapStateToProps, actions)(AllPost);
