//packages
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";
import { ReactMdePreview } from "react-mde";

//Components
import * as CSSConstant from "../CSSConstant";

//Icons
import likesIcon from "../svg-icons/like.svg";
import likesIcon1 from "../svg-icons/like2.svg";
import * as UtilityMethod from "../UtilityMethod";

//Styles
const PostItemWrapper = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 6px;
  padding: 9px;
  border-radius: 3px;
  background: white;

  & .mde-preview .mde-preview-content {
    border: none;
  }
  /* TO Hide Markdown text */
  & .mde-help {
    display: none;
  }
`;

const PostHeader = styled.section``;
const User = styled.span`
  width: 50px;
  height: 50px;
  display: inline-block;
  & > img {
    max-width: 100%;
    border-radius: 50%;
  }
`;

const UserInfo = styled.span`
  color: ${props => props.theme.greenColor};
  margin-left: 9px;
`;

const PostTitle = styled.h3`
  font-size: 19px;
  font-family: ${props => props.theme.textColor};
  text-align: left;
`;

const PostContent = styled.section`
  font-family: ${CSSConstant.playfair};
  color: rgba(0, 0, 0, 0.54) !important;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`
  float: left;
`;

const PostLink = styled.section`
  text-align: left;
  & a {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const HearIcon = styled.span`
  cursor: pointer;
  & i {
    color: ${props => (props.isLiked ? " #00ab6b" : "black")};
  }
`;

const LikeWrapper = styled.section`
  float: left;
`;

const CommentCount = styled.section`
  float: right;
`;

class PostItem extends Component {
  constructor() {
    super();
    this.renderAuthorContent = this.renderAuthorContent.bind(this);
    this.renderLikes = this.renderLikes.bind(this);
    this.likeIconHandler = this.likeIconHandler.bind(this);
  }

  likeIconHandler() {
    const { incrementLikes, index, userInfo, post } = this.props;
    incrementLikes({
      postIndex: index,
      postId: post._id,
      userId: userInfo.user._id,
      isLiked: userInfo.user.blogliked.includes(post._id)
    });
  }

  renderAuthorContent() {
    const { post, index, isAllPostSection } = this.props;
    return (
      <PostLink>
        {isAllPostSection ? (
          <Link to={`allblog/${post.title + "-" + index}`}>
            <p>Read more</p>
          </Link>
        ) : (
          <Link to={`myblogs/${post.title + "-" + index}`}>
            <p>Read more</p>
          </Link>
        )}
      </PostLink>
    );
  }

  renderLikes() {
    const { post, userInfo } = this.props;

    if (!userInfo.isAuthenticated) {
      return null;
    }

    return (
      <section className="clearfix">
        <LikeWrapper onClick={this.likeIconHandler}>
          <HearIcon isLiked={userInfo.user.blogliked.includes(post._id)}>
            <i className="fa fa-heart-o" />
          </HearIcon>
          <span style={{ marginLeft: "2.5px" }} />
        </LikeWrapper>
        <CommentCount>{post.comments.length}</CommentCount>
      </section>
    );
  }

  render() {
    const { post, index, isAllPostSection } = this.props;
    const linkPostTitle =
      UtilityMethod.lowerCaseRemoveSpecialChar(post.title) + "-" + index;

    return (
      <PostItemWrapper className="clearfix">
        <PostHeader>
          <User>
            <img src={post.user_id.avatar} />
          </User>
          <UserInfo>{post.user_id.firstName}</UserInfo>
        </PostHeader>

        <PostTitle>{post.title}</PostTitle>
        <PostContent>
          <ReactMdePreview markdown={post.body} />
        </PostContent>

        {!isAllPostSection && (
          <Link to={`myblogs/editblog/${linkPostTitle}`}>Edit</Link>
        )}
        {this.renderAuthorContent()}
        {this.renderLikes()}
      </PostItemWrapper>
    );
  }
}

PostItem.propTypes = {
  incrementLikes: t.func.isRequired,
  post: t.object.isRequired,
  userInfo: t.object.isRequired,
  isAllPostSection: t.bool.isRequired
};

PostItem.defaultProps = {
  isAllPostSection: false
};

export default PostItem;
