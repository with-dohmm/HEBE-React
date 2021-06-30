import axios from 'axios';

// export function main (url, callback) {
//   axios.post('/api' + url)
//   .then(function(response) {
//     callback(response.data);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })

//   // axios(
//   //   {
//   //     url: '/api' + url,
//   //     method: 'post',
//   //     data: {
//   //       user: { id: 'jun17183' }
//   //     },
//   //     baseURL: 'http://localhost:8080',
//   //     withCredentials: false,
//   //   }
//   // ).then(function(response) {
//   //   callback(response.data);
//   // });
// }   

// export function login (user, callback) {
//   axios(
//     {
//       url: '/api/user/login',
//       method: 'post',
//       data: {
//         uid: user.uid,
//         upw: user.upw
//       },
//       baseURL: 'http://loaclhost:8080',
//       withCredentials: false,
//     }
//   ).then(function(response) {
//     callback(response.data);
//   })
// }

export function searchUser (uid, callback) {
  axios(
    {
      url: '/api/search',
      method: 'post',
      data: {
        uid: uid
      },
      baseURL: 'http://loaclhost:8080',
      withCredentials: false,
    }
  ).then(function(response) {
    callback(response.data);
  })
}
