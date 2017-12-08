
import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import TrainLine from './TrainLine.jsx';
import Util from '../lib/util.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      routes : [],
      organized : [],
      user: null,
    };
  }

  componentDidMount() {
    console.log(this.props);
    let dataObj = {};
    axios.get('/api/service')
    .then((data) => {
      dataObj.trains = data.data.lines;
      return axios.get('/api/routes');
    })
    .then((data) => {
      dataObj.routes = data.data;
      dataObj.organized = Util.routeOrganizer(dataObj.trains, dataObj.routes);
      this.setState(dataObj, () => console.log(dataObj));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h3 className="trainline_header">Train Status</h3>
        <div className="trainline_container">
          {this.state.trains.map((line, idx) =>
            <TrainLine
              key={idx}
              redir={'nav'}
              name={line.name}
              status={line.status}
            />
          )}
        </div>
      </div>
    );
  }
}
