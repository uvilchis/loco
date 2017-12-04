import React from 'react';
import Details from './Details.jsx';
import {
  Router, 
  Route,
  Link
} from 'react-router';


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details : false
    }
    this.showDetails = this.showDetails.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  // we want a route status, but that needs to be related to the number of incoming complaints
  showDetails() {
  this.props.showCurrentRoute(this.props.route, this.props.currentStatus)
  }

  goBack() {
    console.log('go back')
  }

  render() {
    return (
      <div className="nav-properties trainline_row">
        <div className="route-id">
          {this.props.route}
        </div>
         <div className="route-status">
          {this.props.status.status}
        </div>
        <div className="trainline_user">
        </div>
        <Router>
          <li><Link to="/details">{this.props.route}</Link></li>
          <Route path="/details" component={Details}/>
        </Router>
      </div>
    )
  }
}
