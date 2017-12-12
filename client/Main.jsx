import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App.jsx';

import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import Login from './components/Login.jsx';

import Nav from './components/Nav.jsx';
import Details from './components/Details.jsx';
import Survey from './components/Survey.jsx';
import Complaint from './components/Complaint.jsx';
import NavBar from './components/NavBar.jsx';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user/start/')
    .then(({ data }) => this.setState({ userId: data }))
    .catch((error) => console.log(error));
  }

  handleLogin(userId, cb) {
    this.setState({ userId }, cb);
  }

  onLogout() {
    axios.get('/api/user/logout')
    .then((response) => this.setState({ userId: null }))
    .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="outer">
          <NavBar userId={this.state.userId} onLogout={this.onLogout} />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" render={(props) => <Login userId={this.state.userId} handleLogin={this.handleLogin} {...props}/>} />
            <Route path="/nav/:routeId" component={Nav} />
            <Route path="/detail/:routeId" component={Details} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
