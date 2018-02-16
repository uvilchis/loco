import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import getInitialState from './store/initial-state';
import axios from 'axios';

import Main from './components/Main.jsx';
import NavBar from './components/shared/NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.store = createStore(reducer, getInitialState());
    console.log(this.store.getState());
  }

  componentDidMount() {
    // axios.get('/api/user/start/')
    // .then(({ data }) => this.setState({ logged: true }))
    // .catch((error) => console.log(error));
  }

  handleLogin(logged, cb) {
    this.setState({ logged }, cb);
  }

  onLogout() {
    // axios.get('/api/user/logout')
    // .then((response) => this.setState({ logged: false }))
    // .catch((error) => console.log(error));
  }


  render() {
    return (
      <Provider store={this.store}>
        <div className="outer">
          <NavBar onLogout={this.onLogout} />
          <Main handleLogin={this.handleLogin} />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
