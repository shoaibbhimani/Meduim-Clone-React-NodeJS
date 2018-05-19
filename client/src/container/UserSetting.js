import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../action-creators";

const Wrapper = styled.section`
  width: 70%;
  margin: 20px auto;
`;

const ButtonContainer = styled.section`
  text-align: center;
  margin-top: 5px;
`;

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

class UserSetting extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: ""
  };

  componentDidMount() {
    const { user } = this.props;
    const { firstName, lastName, email } = user;
    this.setState({
      firstName,
      lastName,
      email
    });
  }

  saveUserProfile = (event, callback) => {
    event.preventDefault();
    const { editUserdata } = this.props;
    const { firstName, lastName, email } = this.state;
    editUserdata({ firstName, lastName, email });
  };

  changeState = event => {
    this.setState({
      [event.target.getAttribute("data-state")]: event.target.value
    });
  };

  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <Wrapper>
        <form onSubmit={this.saveUserProfile}>
          <input
            value={firstName}
            onChange={this.changeState}
            type="text"
            data-state="firstName"
            placeholder="Enter your First Name"
          />
          <input
            value={lastName}
            onChange={this.changeState}
            type="text"
            data-state="lastName"
            placeholder="Enter your Last Name"
          />
          <input
            value={email}
            onChange={this.changeState}
            type="text"
            data-state="email"
            placeholder="Enter your Email"
          />
          <ButtonContainer>
            <button className="btn btn-medium" type="submit">
              Save
            </button>
          </ButtonContainer>
        </form>
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps, actions)(UserSetting);
