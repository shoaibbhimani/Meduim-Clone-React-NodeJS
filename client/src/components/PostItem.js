//packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as t from 'prop-types';
import { ReactMdePreview } from "react-mde"

//Components
import PostHeader from './PostHeader';
import Comments from './Comments';

//Icons
import likesIcon from '../svg-icons/like.svg';

const PostItemWrapper = styled.li`display: inline;`;

const PostTitle = styled.section`
  font-size: 27px;
  text-align: left;
`;

const PostImageWrapper = styled.section``;
const PostImage = styled.img`float: left;`;

const PostExcerpt = styled.section`text-align: left;`;
const PostLink = styled.section`text-align: left;`;

const LikeIcon = styled.span`
  & img {
    width: 20px;
    height: 20px;
  }
`;

class PostItem extends Component {
  likeIconHandler = () => {
    const { incrementLikes, index } = this.props;

    incrementLikes({ index });
  };

  render() {
    const { post } = this.props;
    return (
      <PostItemWrapper>
        {/*<PostHeader post={post} />*/}
        {post.thumbnail && (
          <PostImageWrapper className="clearfix">
            <PostImage className="img-responsive" src={post.thumbnail} />
          </PostImageWrapper>
        )}

        <PostTitle>{post.title}</PostTitle>
          <ReactMdePreview markdown={post.body}/>
        <PostLink>
          <Link to={`/${post._id}`}>
            <p>Read more</p>
            <p>{post.user_id.email}</p>
          </Link>
        </PostLink>
        <section className="clearfix">
          <section
            style={{
              float: 'left',
            }}
            onClick={this.likeIconHandler}
          >
            <LikeIcon>
              <img src={likesIcon} />
            </LikeIcon>
            <span style={{ marginLeft: '2.5px' }}>{post.likes}</span>
          </section>
        </section>

        <hr />
      </PostItemWrapper>
    );
  }
}

PostItem.propTypes = {
  incrementLikes: t.func.isRequired,
  post: t.object.isRequired,
};

export default PostItem;
