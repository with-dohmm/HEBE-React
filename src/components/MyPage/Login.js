import React, { useState, useEffect, useRef } from 'react';
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
        console.log(loginUser);
        axios.post('/api/user/login', loginUser)
        .then( (res) => { loginAxiosAfter(res); })
        .catch(error => { console.log(error); alert('아이디 또는 비밀번호를 확인해 주세요.'); });
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
        .then((res) => {
            loginAxiosAfter(res);
        })
        .catch((e) => {
            console.log(e);
        })
    };

    {/* 카카오 로그인 */}
    const kakaoApi = () => {
        window.Kakao.init('e7cf10ac1a71bf1129ab049b22386ffb');
        window.Kakao.Auth.createLoginButton({
            container: "#kakaoLogin",
            success: () => {
                window.Kakao.API.request({
                    url: "/v2/user/me",
                    success: (res) => {
                        const data = {
                            username: res.kakao_account.email, 
                            password: res.id,
                            profileimg: res.kakao_account.profile.thumbnail_image_url,
                            provider: 'kakao'
                        }
                        axios.post('/api/user/oauth', data)
                        .then( (res) => { loginAxiosAfter(res); })
                        .catch(e => { console.log(e); });
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                });
            },
            fail: (e) => {
                console.log(e);
            }
        });
    };

    {/* 네이버 로그인 */}
    const naverApi = ()=>{
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId:'Wt7w44Bz35znrEJBbnnN', 
            callbackUrl:'http://localhost:3000',
            isPopup: false,
            loginButton: { color: "green", type: 3, height: 60,} 
            }
        );
        naverLogin.init();

        document.querySelector('#naverIdLogin_loginButton').click();

        let data;

        const getUserInfo = () => {
            naverLogin.getLoginStatus((status) => {
                if (status) {
                    data = {
                        username: naverLogin.user.email, 
                        password: naverLogin.user.id,
                        profileimg: naverLogin.user.profile_image,
                        provider: 'naver'
                    }
                } else {
                    console.log("AccessToken이 올바르지 않습니다.");
                }
            });
        }

        getUserInfo();
        
        axios.post('/api/user/oauth', data)
        .then( (res) => { loginAxiosAfter(res); })
        .catch(e => { console.log(e); }); 
    };

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
                        <span onClick={ () => {setOpenJoinModal(true); loginModalClose();} }>계정 만들기</span>
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
                        
                        <div className="login-api-naver">
                            <img src="/img/common/naverLogo.svg" onClick={ naverApi } alt="네이버 로그인 버튼"/>
                            <div id="naverIdLogin"></div>
                        </div>
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