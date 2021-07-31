import React, { useState, useContext } from 'react';

const MyPage = () => {
    let loginUserInfo = window.localStorage.getItem('loginUser');
    loginUserInfo = JSON.parse(loginUserInfo);
    console.log('myPage user' + loginUserInfo.username);
    return (
        <div>
            <h1>my Page</h1>
            <h2>{loginUserInfo.username}</h2>
        </div>
    );
}

export default MyPage;