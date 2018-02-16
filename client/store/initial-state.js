const getInitialState = () => ({

  // Used to show whether or not an async call is being made
  fetching: false,

  // Control user access throughout the app
  loggedIn: false,

  // Scraped service data from MTA
  service: [],

  // Ask API for routes to display
  routes: []
});

export default getInitialState;