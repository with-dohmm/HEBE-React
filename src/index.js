import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

axios.defaults.baseURL = 'http://ec2-15-164-202-112.ap-northeast-2.compute.amazonaws.com:8080';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);