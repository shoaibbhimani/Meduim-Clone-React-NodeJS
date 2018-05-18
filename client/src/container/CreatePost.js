import React from "react";
import ReactMde, { ReactMdeCommands } from "react-mde";
import styled from "styled-components";
import { connect } from "react-redux";
import Select from "react-select";

import "normalize.css/normalize.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import "font-awesome/css/font-awesome.css";

import * as actions from "../action-creators";
import * as Constant from "../Constant.js";
import * as UtilityMethods from "../UtilityMethod";

const CreatePostContainer = styled.section`
  background: white;
`;

const ButtonContainer = styled.section`
  text-align: center;
  margin-top: 5px;
`;

const initialState = {
  reactMdeValue: { text: "", selection: null },
  title: "",
  thumbnail: "",
  tags: [],
  isEditing: false
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.getDefaultState();
  }

  getDefaultState = () => {
    const { posts, match, location } = this.props;
    const isEditing = location.pathname.indexOf("editblog") !== -1;

    if (!isEditing) {
      return;
    }

    const index = match.params.postId.split("-").pop();
    const post = posts[index];

    this.setState({
      reactMdeValue: { text: post.body, selection: null },
      title: post.title,
      thumbnail: post.thumbnail,
      postId: post._id,
      post: post,
      index,
      tags: post.tags.map(p => ({
        value: p,
        label: UtilityMethods.titleCase(p)
      })),
      isEditing
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      title,
      thumbnail,
      reactMdeValue,
      tags,
      isEditing,
      postId,
      index
    } = this.state;
    const { createPost, history, editPost, location } = this.props;

    if (isEditing) {
      editPost(
        {
          data: {
            title,
            thumbnail,
            body: reactMdeValue.text,
            tags: tags.map(t => t.value)
          },
          postId,
          index
        },
        () => {
          history.push("/myblogs");
        }
      );
    } else {
      createPost(
        {
          title,
          thumbnail,
          body: reactMdeValue.text,
          tags: tags.map(t => t.value)
        },
        () => {
          history.push("/myblogs");
        }
      );
    }

    this.setState(initialState);
  };

  handleValueChange = value => {
    this.setState({ reactMdeValue: value });
  };

  changeThumbnail = event => {
    this.setState({
      thumbnail: event.target.value
    });
  };

  changeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  addTags = tags => {
    this.setState({ tags: tags });
  };

  render() {
    const { title, thumbnail, tags } = this.state;
    return (
      <CreatePostContainer>
        <section className="row">
          <div className="col l3" />
          <form className="col l6" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Enter your Title"
                  id="first_name"
                  value={title}
                  onChange={this.changeTitle}
                  type="text"
                  className="validate"
                />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.changeThumbnail}
                  value={thumbnail}
                  placeholder="Enter your Thumbnail link"
                  id="last_name"
                  type="text"
                  className="validate"
                />
              </div>
            </div>
            <section className="row">
              <div className="col l12">
                <ReactMde
                  textAreaProps={{
                    id: "ta1",
                    name: "ta1"
                  }}
                  value={this.state.reactMdeValue}
                  onChange={this.handleValueChange}
                  commands={ReactMdeCommands.getDefaultCommands()}
                />
              </div>
            </section>

            <Select
              isMulti={true}
              simpleValue
              onChange={this.addTags}
              options={Constant.TAGLIST}
              placeholder="Select your favourite(s)"
              value={tags}
            />

            <ButtonContainer>
              <button className="btn btn-medium" type="submit">
                {this.state.isEditing ? "Edit Post" : "Create Post"}
              </button>
            </ButtonContainer>
          </form>
          <div className="col l3" />
        </section>
      </CreatePostContainer>
    );
  }
}

export default connect(mapStateToProps, actions)(CreatePost);
