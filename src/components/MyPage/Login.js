import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './../../css/MyPage/Login.css';
import { GoogleLogin } from 'react-google-login';

const Login = ({ openLoginModal, setOpenLoginModal, setOpenJoinModal }) => {
    const [loginUser, setLoginUser] = useState({username: '', password: '', provider: 'HEBE'});
    const loginWrap = useRef();
    let loginUserInfo = { iuser: 0 }
    const loginEmailInput = useRef();
    const loginPwInput = useRef();

    const loginModalClose = () => {
        setOpenLoginModal(false);
    }

    const loginAxiosAfter = (res) => {
        if(res.data.iuser === 0) {
            alert('중복된 아이디 입니다.');
        }
        loginUserInfo = {
            isLogin: true,
            iuser: res.data.iuser, 
            username: res.data.username, 
            nickname: res.data.nickname, 
            profileimg: res.data.profileimg, 
            introduction: res.data.introduction,
            provider: res.data.provider
        };
        window.localStorage.setItem('loginUser', JSON.stringify(loginUserInfo));
        loginModalClose();
        window.location.reload();
    };

    {/* 헤베 로그인 */}
    const loginHandler = () => {
        axios.post('/api/user/login', loginUser)
        .then( (res) => { loginAxiosAfter(res); })
        .catch( () => { alert('아이디 또는 비밀번호를 확인해 주세요.'); });
    }

    const enterLogin = (e) => {
        if(e.key === 'Enter') {
            loginHandler();
        }
    };

    {/* 구글 로그인 */}
    const googleApi = (res) => {
        axios({
            method: 'post',
            url: '/api/user/oauth', 
            data: {
                username: res.profileObj.email, 
                password: res.profileObj.googleId,
                profileimg: res.profileObj.imageUrl,
                provider: 'google'
            }
        })
        .then((res) => { loginAxiosAfter(res); })
        .catch((e) => { console.log(e); })
    };

    {/* 카카오 로그인 */}   
    useEffect(()=>{
        const kakaoScript = document.createElement('script');
        kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        document.head.appendChild(kakaoScript);

        // Kakao sdk 스크립트 로드 완료시
        kakaoScript.onload = () => {
            window.Kakao.init('e7cf10ac1a71bf1129ab049b22386ffb');
            window.Kakao.Auth.createLoginButton({
                container: "#kakaoLogin"
            });
        };

    }, []);

    const kakaoApi = () => {
        window.Kakao.Auth.login({
            success: function (res) {
                 window.Kakao.Auth.setAccessToken(res.access_token);
                 window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res) => {
                      const data = {
                            username: res.kakao_account.email, 
                            password: res.id,
                            profileimg: res.kakao_account.profile.profile_image_url,
                            provider: 'kakao'
                        }
                        axios.post('/api/user/oauth', data)
                        .then( (res) => { loginAxiosAfter(res); })
                        .catch( (e) => { console.error(e); });
                    },
                    fail: (e) => { console.log(e); }
                });    
            }
        });
    }

    return (
        openLoginModal ? (
            <div id="loginWrap" ref={loginWrap} className="login-wrap">
                <div className="login-modal">
                <div id="loginCloseBtn" className="login-modal-close" onClick={loginModalClose}>&times;</div>

                    <h1 className="login-modal-title">Login</h1>

                    <div className="login-modal-input">
                        <input ref={loginEmailInput} id="loginEmailInput" className="login-input" type="email" onChange={ (e) => setLoginUser({...loginUser, username: e.target.value}) } 
                        placeholder="이메일을 입력해주세요." />

                        <input type="password" ref={loginPwInput} onKeyPress={ enterLogin } onChange={ (e) => setLoginUser({...loginUser, password: e.target.value}) } 
                        className="login-input" placeholder="패스워드를 입력해주세요." />
                        
                        <div className="login-modal-submit" onClick={loginHandler}>로그인</div>
                    </div>
                    
                    <div className="login-join-modal">
                        <span>신규 사용자이신가요? </span>
                        <span onClick={ () => {setOpenLoginModal(false); setOpenJoinModal(true);} }>계정 만들기</span>
                        <div>또는</div>
                    </div>

                    <div className="login-api-area">
                        <GoogleLogin
                            clientId="1032001853934-78dmac7kurqos5r8bpvs9hen0afa8bgv.apps.googleusercontent.com"
                            render={renderProps => <img src="/img/common/googleLogo.svg" onClick={renderProps.onClick} disabled={renderProps.disabled} alt="구글 로그인 버튼"/>}
                            onSuccess={ googleApi }
                            onFailure={ console.error() }
                            cookiePolicy={"single_host_origin"}
                        />
                        
                        <img src="/img/common/kakaoLogo.svg" id="kakaoLogin" onClick={ kakaoApi } alt="카카오 로그인 버튼"/>
                        
                    </div>
                </div>
                <div className="login-wrap-back" onClick={ loginModalClose }></div>
            </div>
        )
        :
        <></>
    );
}

export default Login;