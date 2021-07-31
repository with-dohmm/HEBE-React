import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './App';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);