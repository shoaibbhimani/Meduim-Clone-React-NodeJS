import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

//Images
import likesIcon from "../svg-icons/like.svg";

//Components
import PostHeader from "../components/PostHeader";

import Comment from "./Comment.js";

import { incrementLikes, addComments } from "../action-creators";

import { ADD_COMMENTS } from "../actions-types";

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

const PostImage = styled.img``;

const SocialMediaIcons = styled.section`
  position: absolute;
  top: 60%;
  left: 15%;
  cursor: pointer;
`;

class PostsDetails extends React.Component {
  addComments = ({ text, index }) => {
    const { userInfo } = this.props;
    this.props.addComments({
      text,
      index,
      userInfo: userInfo
    });
  };

  render() {
    return null;
    const { match, posts, incrementLikes } = this.props;
    const postid = parseInt(match.params.postid, 10);
    //Get Index
    const postIndex = posts.findIndex(post => post.id === postid);
    //get Post
    const post = posts[postIndex];

    const IconHandler = () => {
      incrementLikes({ index: postIndex });
    };
    return (
      <PostsDetailsWrapper>
        <SocialMediaIcons>
          <section>
            <img onClick={IconHandler} src={likesIcon} />
          </section>
          <section style={{ textAlign: "center" }}>{post.likes}</section>
        </SocialMediaIcons>
        <PostHeader post={post} />
        <PostTitle>{post.title}</PostTitle>
        <section>
          {post.thumbnail && (
            <PostImageWrapper className="clearfix">
              <PostImage
                src={`https://cdn-images-1.medium.com/fit/t/800/240/1*jVnqkmLgnIbuVlFYl5-T_Q.png`}
              />
            </PostImageWrapper>
          )}
        </section>
        <PostContent>{post.content}</PostContent>

        <Comment
          comments={post.comments}
          addComments={this.addComments}
          postIndex={postIndex}
        />
      </PostsDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps, { incrementLikes, addComments })(
  PostsDetails
);
