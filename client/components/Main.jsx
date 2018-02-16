import React from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch, Link } from 'react-router-dom';

// import TrainList from './TrainList.jsx';
// import Login from '..jsx';
// import Nav from './Nav.jsx';
// import Details from './Details.jsx';
import Util from './lib'
import NavBarContainer from '../containers/NavBarContainer';
import LogInContainer from '../containers/LogInContainer';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   service: [],
    //   routes : [],
    //   organized : [],
    //   user: null,
    // };
  }

  componentDidMount() {
    // store.dispatch(checkLogged());
    // let dataObj = {};
    // axios.get('/api/service?sub=mta')
    // .then(({ data }) => {
    //   dataObj.service = data.lines;
    //   return axios.get('/api/routes?sub=mta');
    // })
    // .then(({ data }) => {
    //   dataObj.routes = data;
    //   dataObj.organized = Util.routeOrganizer(dataObj.service, dataObj.routes);
    //   this.setState(dataObj);
    // })
    // .catch((error) => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="outer">
          <NavBarContainer />
          <Switch>
            <Route path="/login" component={LogInContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  // render() {
  //   return (
  //     <BrowserRouter>
  //       <Switch>

  //       </Switch>
  //     </BrowserRouter>
  //   );
  // }
}

/*
<Route exact path="/" render={(props) => <TrainList trains={this.state.trains} {...props} />} />
<Route path="/login" render={(props) => <Login logged={this.props.logged} handleLogin={this.props.handleLogin} {...props} />} />
<Route path="/nav/:routeId" component={Nav} />
<Route path="/detail/:routeId" component={Details} />
*/