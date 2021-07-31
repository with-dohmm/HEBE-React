import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import './../../css/MyPage/Login.css';
import { LoginState } from './../../App';

const Login = (props) => {
    const [loginUser, setLoginUser] = useState({username: 'sue', password: '1234'});
    const {state, dispatch} = useContext(LoginState);
    const loginWrap = useRef();


    const loginModalClose = () => {
        const loginWrapEl = loginWrap.current; 
        if(loginWrapEl) {
            loginWrapEl.classList.add('hidden'); 
        }
    }

    // 로그인
    const loginHandler = () => {
        axios.post('/api/user/login', loginUser)
        .then( (res) => {
            const userInfo = {
                iuser: res.data.iuser, 
                username: res.data.username, 
                nickname: res.data.nickname, 
                profile: res.data.profile, 
                introduction: res.data.introduction
            };

            window.localStorage.setItem('loginUser', JSON.stringify(userInfo));

            dispatch({type: 'login', value: 'true'});

            loginModalClose();

            console.log("username : " + loginUser.username + ', password : ' + loginUser.password);
            console.log("res.data.nickname : " + res.data.nickname);
        })
        .catch(error => {
            console.log(error)
            alert('아이디 또는 비밀번호를 확인해 주세요.');
        });
    }

    const enterLogin = (e) => {
        if(e.key === 'Enter') {
            loginHandler();
        }
    }

    return (
        <div id="loginWrap" ref={loginWrap} className="login-wrap hidden">
            <div className="login-modal">
            <div id="loginCloseBtn" className="login-modal-close" onClick={loginModalClose}>&times;</div>

                <h1 className="login-modal-title">Login</h1>

                <div className="login-modal-input">
                    <input id="loginEmailInput" className="login-input" type="email" onChange={ (e) => setLoginUser({username: e.target.value, password: loginUser.password}) } 
                    placeholder="이메일을 입력해주세요." />

                    <input type="password" id="loginPwInput" onKeyPress={ enterLogin } onChange={ (e) => setLoginUser({password: e.target.value, username: loginUser.username}) } 
                    className="login-input" placeholder="패스워드를 입력해주세요." />
                    
                    <div className="login-modal-submit" onClick={loginHandler}>로그인</div>
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