import React from 'react';
import { Link } from 'react-router-dom';
import { ChasingDots } from 'better-react-spinkit';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  
  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSignUp(e) {
    this.props.onSignUp({
      username: this.state.username,
      password: this.state.password
    });
  }

  onLogin() {
    this.props.onLogin({
      username: this.state.username,
      password: this.state.password
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    return this.state.logging ? <ChasingDots /> : (
      <div className="login-form">
        <h3 className="login-header">Sign in</h3>
        <input
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange} />
        <input
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange} />
        <button onClick={this.onLogin}>Log in</button>
        <button onClick={this.onSignUp}>Sign up</button>
        <div className="login-error">{this.state.error}</div>
      </div>
    );
  }
}
