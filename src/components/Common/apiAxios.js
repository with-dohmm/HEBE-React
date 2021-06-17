import axios from 'axios';

export default function apiAxios(url, callback) {
  axios(
    {
      url: '/api' + url,
      method: 'post',
      baseURL: 'http://localhost:8080',
      withCredentials: false,
    }
  ).then(function(response) {
    callback(response.data);
  });
} 