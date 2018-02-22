import React from "react";
import styled from "styled-components";

import * as CSSContant from "../CSSConstant"

const Textarea = styled.input`
  width: 100%;
  min-height: 120px;
  border: 1px solid #ebebeb !important;
  padding: 9px;
`;

const Form = styled.form`
 padding: 35px;
`;

const ButtonContainer = styled.section`
 text-align: center;
`

const Button = styled.button`
  padding: 7px 4px;
  width: 140px;
  margin: 6px auto;
  background: black;
  font-family: ${CSSContant.raleway}  
  color: white;
  border: none;
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
        <Form onSubmit={this.submitComment}>
          <Textarea value={this.state.text} onChange={this.changeText} />
          <ButtonContainer>
            <Button type="submit">Add Comment</Button>
          </ButtonContainer>
        </Form>
      </section>
    );
  }
}

export default AddComment;
