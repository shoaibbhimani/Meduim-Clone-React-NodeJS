import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import * as t from "prop-types"

import * as actions from '../action-creators';
import * as CSSConstant from '../CSSConstant';

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
  isAuthenticated: state.user.isAuthenticated,
});

class Header extends React.Component {
  onSuccess = googleUser => {
    const { getUserData, history, toggleAuthentication, setUserData } = this.props;
    getUserData(
      {
        googleId: googleUser.getId(),
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail(),
      },
      () => {
        toggleAuthentication(false);
        history.push('/myblogs');
      },
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
          <Link to="/" className="brand-logo center">
            <h5>React-Redux-NodeJS-Medium-Clone</h5>
          </Link>
          <ul className="left hide-on-med-and-down">
            {!isAuthenticated ? (
              <GoogleContainer>
                <GoogleLogin
                  socialId="83911294138-5vtlktil0du2ihh2lipki6jmtmefbc2l.apps.googleusercontent.com"
                  scope="profile"
                  fetchBasicProfile={true}
                  responseHandler={this.onSuccess}
                  buttonText="Login With Google"
                />
              </GoogleContainer>
            ) : (
              [
                <li key={1}>
                  <Link to="/myblogs">My Blogs</Link>
                </li>,
                <li key={2}>
                  <Link to="/allblog">All Blog</Link>
                </li>,
                <li key={3}>
                  <Link to="/setting">Setting</Link>
                </li>,
                <li key={4}>
                  <Link to="/create_post">Add Post</Link>
                </li>,
                <li key={5} onClick={this.logout}>
                  <a href="#">Log Out</a>
                </li>,
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
