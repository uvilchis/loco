import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Details from './components/Details.jsx';
import Login from './components/Login.jsx';
import Survey from './components/Survey.jsx';
import Complaint from './components/Complaint.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <App />
    )
  }
}

ReactDOM.render(<Router>
  <Route path='/' component={Main} />
  <Route path='/nav' component={Nav} />
  <Route path='/details' component={Details} />
  <Route path='/survey' component={Survey} />
  <Route path='/login' component={Login} />
  <Route path='/complaint' component={Complaint} />
</Router>, document.getElementById('app'));
