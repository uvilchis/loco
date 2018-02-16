import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return nextProps.logged !== this.props.logged;
  // }

  render() {
    return (
      <div className="navbar">
        <div className="logo_container">
          <h1 className="logo"><a href="/">Loco</a></h1>
          {
            this.props.loggedIn ?
            <button className="navbar-button" onClick={this.props.logOut}>Log Out</button> :
            <button className="navbar-button" onClick={this.props.logIn}>Log In</button>
          }
        </div>
      </div>
    );
  }
}


/*
{this.props.logged ? <button className="navbar-button" onClick={this.props.onLogout}>Logout</button> :
<a className="navbar-button" href="/login">Login</a>}
*/