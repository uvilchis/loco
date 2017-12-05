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

ReactDOM.render(<Main />, document.getElementById('app'));
