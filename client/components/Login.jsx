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
      logging: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.setState({ logging: true }, () => {
        axios.get(`/api/user/google/return${this.props.location.search}`)
        .then(({ data }) => {
          this.props.handleGoogle(data);
          this.props.history.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignup(e) {
    let signupObj = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('/api/users/signup', signupObj)
    .then(({ data }) => {

    })
  }

  handleLogin() {

  }

  render() {
    return this.state.logging ? (
        <ChasingDots />
      ) : (
        <div className="login-inputs">
          <input
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button onClick>Log in</button>
          <button>Sign up</button>
          <a href="/api/user/google">Google</a>
        </div>
      )
  }
}
