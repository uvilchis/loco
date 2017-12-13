import React from 'react';
import { Link } from 'react-router-dom';
import { ChasingDots } from 'better-react-spinkit';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logging: false,
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.setState({ logging: true }, () => {
        axios.get(`/api/user/google/return${this.props.location.search}`)
        .then(({ data }) => {
          this.props.handleLogin(data);
          this.props.history.push('/');
        })
        .catch((error) => console.log(error));
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup(e) {
    axios.post('/api/user/signup', {
      username: this.state.username,
      password: this.state.password
    })
    .then(({ data }) => {
      this.props.handleLogin(data);
      this.props.history.push('/');
    })
    .catch((error) => console.log(error));
  }

  handleLogin() {
    this.setState({ logging: true }, () => {
      axios.post('/api/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(({ data }) => {
        this.props.handleLogin(data);
        this.props.history.push('/');
      })
      .catch((error) => this.setState({
        logging: false,
        error: 'Login failed'
      }));
    })
  }

  render() {
    return this.state.logging ?  <ChasingDots /> : (
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
        <button onClick={this.handleLogin}>Log in</button>
        <button onClick={this.handleSignup}>Sign up</button>
        <a id="google-auth" href="/api/user/google">Google</a>
        <div className="login-error">{this.state.error}</div>
      </div>
    );
  }
}
