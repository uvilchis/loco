import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, this.props);
    return nextProps.logged !== this.props.logged;
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo_container">
          <h1 className="logo"><a href="/">Loco</a></h1>
          {this.props.logged ? <button className="navbar-button" onClick={this.props.onLogout}>Logout</button> :
            <a className="navbar-button" href="/login">Login</a>}
        </div>
      </div>
    );
  }
}

// const NavBar = (props) => (
//   <div className="navbar">
//     <div className="logo_container">
//       <h1 className="logo"><a href="/">Loco</a></h1>
//       {props.logged ? <button className="navbar-button" onClick={props.onLogout}>Logout</button> :
//         <a className="navbar-button" href="/login">Login</a>}
//     </div>
//   </div>
// );

// export default NavBar;