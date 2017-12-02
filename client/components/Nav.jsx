import React from 'react';
import Details from './Details.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-properties">
        <div className="route-id">
          {this.props.route}
        </div>
        <div className="route-status">
          {this.props.status}
        </div>
      </div>
    )
  }
}

// render() {
//   const isLoggedIn = this.state.isLoggedIn;
//   return (
//     <div>
//       {isLoggedIn ? (
//         <LogoutButton onClick={this.handleLogoutClick} />
//       ) : (
//         <LoginButton onClick={this.handleLoginClick} />
//       )}
//     </div>
//   );
// }