//packages
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";
import { ReactMdePreview } from "react-mde";

//Icons
import * as UtilityMethod from "../UtilityMethod";

//Styles

//Layouts
const PostItemWrapper = styled.li`
  margin-bottom: 30px;
  box-shadow: 0 0 43px #d6dee4;
  border-radius: 7px;
  overflow: hidden;
  background: white;

  & .mde-preview .mde-preview-content {
    border: none;
  }
  /* TO Hide Markdown text */
  & .mde-help {
    display: none;
  }
`;

const ThumbnailWrapper = styled.section`
  background: url(${props => props.url});
  min-height: 224px;
`;

const ContentWrapper = styled.section``;

const PostHeader = styled.section`
  float: right;
  margin-right: 11px;
  margin-top: 9px;
`;

//Content
const Excerpt = styled.section``;

const PostTitle = styled.h3`
  font-size: 19px;
  font-family: ${props => props.theme.textColor};
  text-align: left;
  padding: 3px 9px;
`;

const PostContent = styled.section`
  font-family: ${props => props.theme.playfair};
  color: rgba(0, 0, 0, 0.54) !important;
  padding: 3px 9px;
`;

const PostLink = styled.section`
  padding: 3px 9px;
  text-align: left;
  & a {
    color: rgba(0, 0, 0, 0.3);
  }
`;

//Footer
const Footer = styled.section`
  padding: 3px 5px;
  border-top: 0.5px solid #ecebeb;
`;

const User = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
  & > img {
    max-width: 100%;
    border: 3px solid #eaeaea;
    border-radius: 50%;
  }
`;

const UserInfo = styled.section`
  float: right;
  margin-right: 20px;
  margin-top: 3px;
`;

const Name = styled.span`
  color: ${props => props.theme.greenColor};
  margin-left: 9px;
  font-family: ${props => props.theme.playfair};
`;

const LikeWrapper = styled.section`
  display: flex;
  width: 50px;
  height: 50px;
  float: left;
  align-items: center;
  justify-content: center;
`;

const CommentCount = styled.section`
  float: right;
`;

const HearIcon = styled.span`
  cursor: pointer;
  & i {
    color: ${props => (props.isLiked ? " #00ab6b" : "black")};
  }
`;

class PostItem extends Component {
  static PropTypes = {
    incrementLikes: t.func.isRequired,
    post: t.object.isRequired,
    userInfo: t.object.isRequired,
    isAllPostSection: t.bool.isRequired
  };

  likeIconHandler = () => {
    const { incrementLikes, index, userInfo, post } = this.props;

    incrementLikes({
      postIndex: index,
      postId: post._id,
      userId: userInfo.user._id,
      isLiked: userInfo.user.blogliked.includes(post._id)
    });
  };

  renderExcerpt = () => {
    const { post } = this.props;

    return (
      <Excerpt>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>
          <ReactMdePreview markdown={post.body} />
        </PostContent>
      </Excerpt>
    );
  };

  renderLinks = () => {
    const { post, index, isAllPostSection } = this.props;
    const linkPostTitle =
      UtilityMethod.lowerCaseRemoveSpecialChar(post.title) + "-" + index;
    return (
      <PostLink>
        {isAllPostSection ? (
          <Link to={`allblog/${linkPostTitle}`}>
            <p>Read more</p>
          </Link>
        ) : (
          <div>
            <Link to={`myblogs/editblog/${linkPostTitle}`}>Edit</Link>
            <Link to={`myblogs/${linkPostTitle}`}>
              <p>Read more</p>
            </Link>
          </div>
        )}
      </PostLink>
    );
  };

  renderLikes = () => {
    const { post, userInfo } = this.props;

    if (!userInfo.isAuthenticated) {
      return null;
    }

    return (
      <Footer className="clearfix">
        <LikeWrapper onClick={this.likeIconHandler}>
          <HearIcon isLiked={userInfo.user.blogliked.includes(post._id)}>
            <i className="fa fa-heart-o" />
          </HearIcon>
        </LikeWrapper>
        <UserInfo>
          <User>
            <img src={post.user_id.avatar} />
          </User>
          <Name>{post.user_id.firstName}</Name>
        </UserInfo>
      </Footer>
    );
  };

  render() {
    const { post, index, isAllPostSection } = this.props;
    const linkPostTitle =
      UtilityMethod.lowerCaseRemoveSpecialChar(post.title) + "-" + index;

    return (
      <PostItemWrapper className="clearfix">
        <ThumbnailWrapper url={post.thumbnail} />

        <ContentWrapper>
          {this.renderExcerpt()}

          {this.renderLinks()}
          {this.renderLikes()}
        </ContentWrapper>
      </PostItemWrapper>
    );
  }
}

PostItem.defaultProps = {
  isAllPostSection: false
};

export default PostItem;
