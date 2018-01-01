import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactMdePreview } from "react-mde";

//Images
import likesIcon from "../svg-icons/like.svg";

//Components
import PostHeader from "../components/PostHeader";
import Comment from "./Comment.js";
import * as actions from "../action-creators";

const PostsDetailsWrapper = styled.section`
  width: 60%;
  margin: 0 auto;
`;

const PostTitle = styled.section`
  padding: 18px;
  text-align: left;
  font-size: 29px;
`;

const PostImageWrapper = styled.section``;
const PostContent = styled.section`
  margin-top: 9px;
  font-size: 18px;
  text-align: left;
`;

const PostImage = styled.img`
  max-width: 100%;
`;

const SocialMediaIcons = styled.section`
  position: absolute;
  top: 60%;
  left: 15%;
  cursor: pointer;
`;

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    userInfo: state.userInfo
  };
};

class PostsDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      postIndex: -1,
      post: {}
    };
  }

  componentDidMount() {
    const { match, incrementLikes, posts } = this.props;
    const postIndex = parseInt(match.params.postId.split("-").pop());
    this.setState({
      postIndex,
      post: posts[postIndex]
    });
  }

  addComments = ({ text, index }) => {
    const { userInfo } = this.props;
    this.props.addComments({
      text,
      index,
      userInfo: userInfo
    });
  };

  IconHandler = () => {
    const { match, incrementLikes } = this.props;
    incrementLikes({ index: this.state.postIndex });
  };

  renderPostHeader = () => {
    return null;
    return <PostHeader />;
  };

  renderTitleContentThumbnail = () => {
    const { post } = this.state;
    return (
      <section>
        <PostTitle>{post.title}</PostTitle>
        <section>
          {post.thumbnail && (
            <PostImageWrapper className="clearfix">
              <PostImage src={post.thumbnail} />
            </PostImageWrapper>
          )}
        </section>
        <ReactMdePreview markdown={post.body} />
        <PostContent>{post.content}</PostContent>
      </section>
    );
  };

  renderComments = post => {
    return null;

    return (
      <Comment
        comments={post.comments}
        addComments={this.addComments}
        postIndex={this.state.postIndex}
      />
    );
  };

  render() {
    const { match, posts, incrementLikes } = this.props;
    const { postIndex } = this.state;
    const post = posts[postIndex];

    if (!post && postIndex === -1) {
      return null;
    }

    return (
      <PostsDetailsWrapper>
        <SocialMediaIcons>
          <section>
            <img onClick={this.IconHandler} src={likesIcon} />
          </section>
          <section style={{ textAlign: "center" }}>{post.likes}</section>
        </SocialMediaIcons>
        {this.renderPostHeader()}

        {this.renderTitleContentThumbnail()}
        {this.renderComments(post)}
      </PostsDetailsWrapper>
    );
  }
}

export default connect(mapStateToProps, actions)(PostsDetails);
