import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
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
      <BrowserRouter>
        <div className="outer">
          <div className="navbar">
            <div className="logo_container">
              <h1 className="logo">Loco</h1>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={App} />
            <Route path='/nav/:routeId' component={Nav} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
