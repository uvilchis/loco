import React from 'react';
import Nav from './Nav.jsx';
import {
  Router, 
  Route,
  Link
} from 'react-router-dom';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrain: [],
      serviceStatus : '',
    }
    this.showNav = this.showNav.bind(this)
  }

  componentDidMount() {
    this.setState({serviceStatus: this.props.line.status})
  }

  showNav(e) {
    
    this.props.showCurrentRoute(this.props.info, this.props.line)
  }

  render() {
    switch (true) {
      case this.state.serviceStatus === "GOOD SERVICE":
        return (
          <div>
              <div className="trainline_row">
                <div className="trainline_routes">
                  {this.props.line.name || this.props.line.route_id}
                </div>
                <div className="trainline_status">
                  {this.props.line.status}
                </div>
                <div className="trainline_user_good">
                </div>
                <button onClick={this.showNav}>
                  Details
                </button>
              </div>
          </div>
        );
        break;

      case this.state.serviceStatus !== "GOOD SERVICE":
        return (
          <div>
              <div className="trainline_row">
                <div className="trainline_routes">
                  {this.props.line.name || this.props.line.route_id}
                </div>
                <div className="trainline_status">
                  {this.props.line.status}
                </div>
                <div className="trainline_user_problems">
                </div>
                <button onClick={this.showNav}>
                  Details
                </button>
              </div>
          </div>
        )
        break;

      default:
        return null
    }
  }
}