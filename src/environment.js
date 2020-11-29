const LOCAL_BACKEND_SERVER = 'http://localhost:5000';
const PRODUCTION = 'https://tempo-backend.herokuapp.com';
const SERVER_DOMAIN = window.location.hostname !== 'localhost' ? PRODUCTION : LOCAL_BACKEND_SERVER;

export default SERVER_DOMAIN;
