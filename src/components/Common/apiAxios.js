import axios from 'axios';

export function main (url, callback) {
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

export function login (user, callback) {
  axios(
    {
      url: '/api/user/login',
      method: 'post',
      data: {
        uid: user.uid,
        upw: user.upw
      },
      baseURL: 'http://loaclhost:8080',
      withCredentials: false,
    }
  ).then(function(response) {
    callback(response.data);
  })
}
