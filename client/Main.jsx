import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/App.jsx';
import NavBar from './components/NavBar.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user/start/')
    .then(({ data }) => this.setState({ logged: true }))
    .catch((error) => console.log(error));
  }

  handleLogin(logged, cb) {
    this.setState({ logged }, cb);
  }

  onLogout() {
    axios.get('/api/user/logout')
    .then((response) => this.setState({ logged: false }))
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="outer">
        <NavBar logged={this.state.logged} onLogout={this.onLogout} />
        <App logged={this.state.logged} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
