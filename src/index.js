import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);