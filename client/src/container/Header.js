import React from "react";
import { GoogleLogin } from "react-google-login-component";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";

import * as actions from "../action-creators";
import * as CSSConstant from "../CSSConstant";

const NavBar = styled.nav`
  background: none;
  font-family: ${CSSConstant.raleway};
  & a {
    color: black;
  }
`;

const GoogleContainer = styled.li`
  & button {
    background: white;
    border: 1px solid #ccc;
    color: #ddd;
  }
`;

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

class Header extends React.Component {
  onSuccess = googleUser => {
    const {
      getUserData,
      history,
      toggleAuthentication,
      setUserData
    } = this.props;
    getUserData(
      {
        googleId: googleUser.getId(),
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail()
      },
      () => {
        toggleAuthentication(false);
        history.push("/myblogs");
      }
    );
  };

  logout = evt => {
    evt && evt.preventDefault();
    this.props.forgetUser();
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <NavBar>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo center">
            <h5>React-Redux-NodeJS-Medium-Clone</h5>
          </NavLink>
          <ul className="left hide-on-med-and-down">
            <li>
              <NavLink activeClassName="active" to="/allblog">
                All Blog
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <GoogleContainer key={0}>
                <GoogleLogin
                  socialId={process.env.REACT_APP_SECRET_GOOGLE_CODE}
                  scope="profile"
                  fetchBasicProfile={true}
                  responseHandler={this.onSuccess}
                  buttonText="Login With Google"
                />
              </GoogleContainer>
            ) : (
              [
                <li key={1}>
                  <NavLink to="/myblogs">My Blogs</NavLink>
                </li>,
                <li key={3}>
                  <NavLink to="/setting">Setting</NavLink>
                </li>,
                <li key={4}>
                  <NavLink to="/create_post">Add Post</NavLink>
                </li>,
                <li key={5} onClick={this.logout}>
                  <a>Log Out</a>
                </li>
              ]
            )}
          </ul>
        </div>
      </NavBar>
    );
  }
}

Header.propTypes = {
  toggleAuthentication: t.func.isRequired,
  isAuthenticated: t.bool.isRequired,
  history: t.object,
  getUserData: t.func.isRequired
};

export default withRouter(connect(mapStateToProps, actions)(Header));
