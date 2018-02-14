import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactMdePreview } from "react-mde";

//Images
import likesIcon from "../svg-icons/like.svg";

//Components
import PostHeader from "../components/PostHeader";
import Comment from "./Comment.js";
import AddComment from "../components/AddComment"

import * as actions from "../action-creators";
import * as APIClient from "../apiclient";
import * as UtilityMethod from "../UtilityMethod"

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

const PostImage = styled.img`max-width: 100%;`;

const SocialMediaIcons = styled.section`
  position: absolute;
  top: 60%;
  left: 15%;
  cursor: pointer;
`;

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)

  return {
    posts: state.posts.posts,
    allPosts: state.allPosts.allPosts,
    userInfo: state.userInfo,
    allPostSection: ownProps.location.pathname.indexOf("/myblogs") === -1
  };
};

class PostsDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      postIndex: -1,
      post: {},
      comments: []
    };
  }

  componentDidMount() {
    const { match, posts, allPosts, allPostSection } = this.props;
    const postIndex = parseInt(match.params.postId.split("-").pop(), 10);
    const post = allPostSection ? allPosts[postIndex] : posts[postIndex];

    this.setState({
      postIndex,
      post
    });

    APIClient.getCommentOfPost({ blogId: post._id }).then(({ data }) => {
      this.setState({
        comments: data
      });
    }).catch(() => {
      console.log("Error")
    });

  }

  addComments = ({ text, index }) => {
    const { userInfo } = this.props;
    const { post, comments } = this.state;
    this.setState({
      comments: comments.concat({
        commentText: text,
        user: UtilityMethod.getLocalStorage().user
      })
    })    
   

    APIClient.postComment({
      blogId: post._id,
      text
    });
  };

  IconHandler = () => {
    const { incrementLikesAllPost, incrementLikesPost, allPostSection } = this.props;
    const { postIndex, post } = this.state;

    if (allPostSection){
      incrementLikesAllPost({ index: postIndex, postId: post._id  })
    } else {
      incrementLikesPost({ index: postIndex, postId: post._id });
    }
  };

  renderPostHeader = () => {
    const { post } = this.state;
    return <PostHeader postauthor={post.user_id} />;
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

  renderComments = () => {
    const { comments } = this.state;
    return (
      <Comment
        comments={comments}
        addComments={this.addComments}
        postIndex={this.state.postIndex}
      />
    );
  };

  render() {
    const { match, posts, incrementLikes, allPosts, allPostSection } = this.props;
    const { postIndex } = this.state;
    const post = allPostSection ? allPosts[postIndex] : posts[postIndex];

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
        {this.renderComments()}
        <AddComment addComments={this.addComments} />
      </PostsDetailsWrapper>
    );
  }
}

export default connect(mapStateToProps, actions)(PostsDetails);
