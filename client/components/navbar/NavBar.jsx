import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo_container">
          <h1 className="logo"><Link to="/">Loco</Link></h1>
          {
            this.props.loggedIn ?
            <button className="navbar-button" onClick={this.props.logOut}>Log Out</button> :
            <Link className="navbar-button" to="/login">Log In</Link>
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