import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import TrainLine from './TrainLine.jsx';
import Util from '../lib/util.js';
import TrainHeaders from './TrainHeaders.jsx';

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
    let dataObj = {};
    axios.get('/api/service?sub=mta')
    .then(({ data }) => {
      dataObj.trains = data.lines;
      return axios.get('/api/routes?sub=mta');
    })
    .then(({ data }) => {
      dataObj.routes = data;
      dataObj.organized = Util.routeOrganizer(dataObj.trains, dataObj.routes);
      this.setState(dataObj);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="trainline_container">
        <TrainHeaders />
        {this.state.trains.map((line, idx) =>
          <TrainLine
            key={idx}
            redir={'nav'}
            name={line.name}
            status={line.status}
          />)
        }
      </div>
    );
  }
}
