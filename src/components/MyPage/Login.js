import axios from 'axios';
import React, { useState } from 'react';
import './../../css/MyPage/Login.css';

const Login = () => {
    const loginModalClose = () => {
        document.querySelector('#loginWrap').classList.add('hidden');
    }

    const [loginUser, setLoginUser] = useState({uid: '', upw: ''});

    const loginHandler = () => {
        const data = { loginUser };
        axios.post('/user/login', data)
        .then(res => {
            const { accessToken } = res.data;

            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            // accessToken을 localStorage, cookie 등에 저장하지 않는다!

        }).catch(error => {
            // ... 에러 처리
        });
    }

    return (
        <div id="loginWrap" className="login-wrap hidden">
            <div className="login-modal">
            <div id="loginCloseBtn" className="login-modal-close" onClick={loginModalClose}>&times;</div>

                <h1 className="login-modal-title">Login</h1>

                <div className="login-modal-input">
                    <input id="loginEmailInput" onChange={ (e) => setLoginUser({uid: e.target.value, upw: loginUser.upw}) } 
                    className="login-input" placeholder="이메일을 입력해주세요." />

                    <input type="password" id="loginPwInput" onChange={ (e) => setLoginUser({upw: e.target.value, uid: loginUser.uid}) } 
                    className="login-input" placeholder="패스워드를 입력해주세요." />
                    
                    <div className="login-modal-submit">로그인</div>
                </div>
                
                <div className="login-join-modal">
                    <span>신규 사용자이신가요? </span>
                    <span id="goToJoinModal">계정 만들기</span>
                    <div>또는</div>
                </div>

                <div className="login-api-area">
                    <img alt="google login" src="/img/loginApi/googleLogo.svg" />
                    <img alt="kakao login" src="/img/loginApi/kakaoLogo.svg" />
                    <img alt="naver login" src="/img/loginApi/naverLogo.svg" />
                </div>
            </div>
            <div className="login-wrap-back" onClick={ loginModalClose }></div>
        </div>
    );
}

export default Login;