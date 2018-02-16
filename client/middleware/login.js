import axios from 'axios';
// We simply check the server to see if there's an existing session
const checkLoggedIn = response => response.status === 200;

const callApi = (endpoint) => axios.get(endpoint);