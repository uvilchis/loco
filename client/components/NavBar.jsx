import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <div className="navbar">
    <div className="logo_container">
      <h1 className="logo"><Link to="/">Loco</Link></h1>
      {props.userId ? <button className="navbar-button" onClick={props.onLogout}>Logout</button> :
        <Link className="navbar-button" to="/login">Login</Link>
      }
    </div>
  </div>
);

export default NavBar;