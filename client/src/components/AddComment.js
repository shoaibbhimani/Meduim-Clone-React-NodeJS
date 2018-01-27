import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid #ebebeb;
  padding: 9px;
`;

class AddComment extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  changeText = evt => {
    this.setState({
      text: evt.target.value
    });
  };

  submitComment = evt => {
    evt && evt.preventDefault();
    const { addComments, postIndex } = this.props;

    addComments({
      text: this.state.text,
      index: postIndex
    });

    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <section>
        <form onSubmit={this.submitComment}>
          <Textarea value={this.state.text} onChange={this.changeText} />
          <button type="submit">Add Comment</button>
        </form>
      </section>
    );
  }
}

export default AddComment;
