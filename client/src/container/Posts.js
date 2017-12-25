import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//Components
import PostItem from "../components/PostItem";

//Action Creators
import * as actions from "../action-creators";

const PostWrapper = styled.section`
  padding: 12px;
`;

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

class Posts extends React.Component {
  componentDidMount() {
    this.props.getPost();
  }

  render() {
    const { posts, incrementLikes } = this.props;
    return (
      <section className="row">
        <section className="col-md-7">
          <PostWrapper>
            <ul>
              {posts.map((post, index) => (
                <PostItem
                  incrementLikes={incrementLikes}
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

export default connect(mapStateToProps, actions)(Posts);
