import React from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.showNav = this.showNav.bind(this)
  }

  componentDidMount() {
    // this.setState({ serviceStatus: this.props.line.status })
  }

  showNav(e) {
    this.props.showCurrentRoute(this.props.info, this.props.line)
  }

  render() {
    let status = this.props.status === 'GOOD SERVICE';
    return (
      <div>
        <div className="trainline_row">
          <div className="trainline_routes">
            {this.props.name}
          </div>
          <div className="trainline_status">
            {this.props.status}
          </div>
          <div className={status ? 'trainline_user_good' : 'trainline_user_problems'}>
          </div>
          <button onClick={this.showNav}>
            <Link to={{
              pathname: `/${this.props.redir}/${this.props.name}`,
              // state: { 
              //   info: this.props.info,
              //   line: this.props.line
              // }
              }}>
              Details 
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

{/* return (
      <div>
          <div className="trainline_row">
            <div className="trainline_routes">
              {this.props.line.name || this.props.line.route_id}
            </div>
            <div className="trainline_status">
              {this.props.line.status}
            </div>
            <div className="trainline_user">
            </div>
            <button onClick={this.showNav}>
              <Link to={{
                pathname: `nav/${this.props.line.name}`,
                state: { 
                  info: this.props.info,
                  line: this.props.line
                 }
                }}>
                Details 
              </Link>
            </button>
          </div>
        ) */}