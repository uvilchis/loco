import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App.jsx';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Details from './components/Details.jsx';
import Survey from './components/Survey.jsx';
import Complaint from './components/Complaint.jsx';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user/start/')
    .then(({ data }) => {
      this.setState({ userId: data });
    })
    .catch((error) => console.log(error));
  }

  handleLogin(userId, cb) {
    this.setState({ userId }, cb);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="outer">
          <div className="navbar">
            <div className="logo_container">
              <h1 className="logo"><Link to="/">Loco</Link></h1>
              {this.state.userId ? null : <Link to="/login">login</Link>}
            </div>
          </div>
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
