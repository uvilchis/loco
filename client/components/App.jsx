import React from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch, Link } from 'react-router-dom';

import TrainList from './TrainList.jsx';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import Details from './Details.jsx';
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
  // <TrainList trains={this.state.trains} />

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <TrainList trains={this.state.trains} {...props} />} />
          <Route path="/login" render={(props) => <Login logged={this.props.logged} handleLogin={this.props.handleLogin} {...props} />} />
          <Route path="/nav/:routeId" component={Nav} />
          <Route path="/detail/:routeId" component={Details} />
        </Switch>
      </BrowserRouter>
    );
  }
}
