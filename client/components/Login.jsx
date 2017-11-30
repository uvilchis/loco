import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    tempObj = {};
    tempObj.username = this.state.username;
    tempObj.password = this.state.password;
    axios.post('/users', tempObj)
    .then((data) => {
      // redirect to page to submit complaint
    })
    .catch((err) => {
      console.log('ISSUE WITH SUBMISSION');
    })
  }
  render() {
    return (
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
        <button onClick={} >
          Submit
        </button>
      </div>
    )
  }
}
