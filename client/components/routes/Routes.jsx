import React from 'react';

import RouteGroup from './RouteGroup.jsx';

export default class Routes extends React.Component {

  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    return (
      <div className="trainline_container">
        {this.props.routes.map((route, idx) => 
          <RouteGroup key={idx} name={'test'} status={'GOOD_SERVICE'} />)}
      </div>
    );
  }
}