import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import TrainLine from './TrainLine.jsx';
import Nav from './Nav.jsx';
import Details from './Details.jsx';
import Survey from './Survey.jsx';
import Complaint from './Complaint.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      stops: [],
      routes : [],
      organized : [],
      user: null,
      nav : false,
      route_id: '',
      currentTrain: [],
      currentStatus: []
    };
    this.routeOrganizer = this.routeOrganizer.bind(this);
    this.showCurrentRoute = this.showCurrentRoute.bind(this);
  }

  componentDidMount() {
    let dataObj = {};
    axios.get('/api/service')
    .then((data) => {
      dataObj.trains = data.data.lines;
      return axios.get('/api/routes');
    })
    .then((data) => {
      dataObj.routes = data.data;
      dataObj.organized = this.routeOrganizer(dataObj.trains, dataObj.routes);
      this.setState(dataObj, () => console.log(dataObj));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  showCurrentRoute(input1, input2) {
    this.setState({
      currentTrain: input1,
      currentStatus: input2
    });
  }

  routeOrganizer(trains, routes) {
    return trains.reduce((acc, train) => {
      routes.forEach((route) => {
        if (train.name.includes(route.route_id)) {
          if (!acc[train.name]) { acc[train.name] = []; }
          acc[train.name].push(route);
        }
      });
      return acc;
    }, {});
  }

  render() {
    return (
      <div>
        <h3 className="trainline_header">Train Status</h3>
        <div className="trainline_container">
          {this.state.trains.map((line, idx) =>
            <TrainLine
              key={idx}
              redir={'nav'}
              name={line.name}
              status={line.status}
            />
          )}
        </div>
      </div>
    );
    // switch(true) {
    //   case this.state.currentTrain.length === 0:
    //     console.log('showing TrainLines');
    //     return (
    //       <div>
    //         <h3 className="trainline_header">Train Status</h3>
    //         <div className="trainline_container">
    //           {this.state.trains.map((line, idx) =>
    //             <TrainLine
    //               line={line || line.route_id}
    //               key={idx}
    //               loggedIn={this.state.user ? true : false}
    //               setAppState={this.setAppState}
    //               info={this.state.organized[line.name]}
    //               showCurrentRoute={this.showCurrentRoute}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     )
    //     break;

    //     case this.state.currentTrain.length > 1:
    //       console.log('showing Nav');
    //       return (
    //         <div>
    //           <h3 className="trainline_header">Train Status</h3>
    //           <div className="trainline_container">
    //             <Nav
    //               routes={this.state.currentTrain}
    //               status={this.state.currentStatus}
    //               showCurrentRoute={this.showCurrentRoute}
    //               />
    //             {/* {this.state.currentTrain.map((route, idx) =>
    //               <Nav
    //               key={idx}
    //               route={route.route_id}
    //               status={this.state.currentStatus}
    //               showCurrentRoute={this.showCurrentRoute}
    //               />
    //             )} */}
    //           </div>
    //         </div>
    //       )
    //       break;

    //       case this.state.currentTrain.length === 1:
    //         console.log('showing Deatils');
    //         return (
    //           <div>
    //             <h3 className="trainline_header">Train Status</h3>
    //             <div className="trainline_container">
    //                 <Details
    //                 route={this.state.currentTrain[0].route_id}
    //                 status={this.state.currentStatus}
    //                 />
    //             </div>
    //           </div>
    //         )
    //         break;

    //       default:
    //         return null
    // return (
    //   <Router>
    //     <div>
    //       <div className="navbar">
    //         <div className="logo_container">
    //           <h1 className="logo">Loco</h1>
    //         </div>
    //       </div>
    //       <h3 className="trainline_header">Train Status</h3>
    //         <div className="trainline_container">
    //           {this.state.trains.map((line, idx) =>
    //             <TrainLine
    //               line={line || line.route_id}
    //               key={idx}
    //               loggedIn={this.state.user ? true : false}
    //               setAppState={this.setAppState}
    //               info={this.state.organized[line.name]}
    //               showCurrentRoute={this.showCurrentRoute}
    //             />
    //           )}
    //         </div>        
    //       <div>
    //         <Route path='/nav' render={NavPage} />
    //         <Route path='/details' component={Details} />
    //         <Route path='/survey' component={Survey} />
    //         <Route path='/complaint' component={Complaint} />
    //       </div>
    //     </div>
      // </Router>
  }
}
