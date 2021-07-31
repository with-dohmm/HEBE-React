import axios from 'axios';
import React, { useState, useRef } from 'react';
import './../../css/MyPage/Join.css';
import useCountDown from 'react-countdown-hook';

const Join = () => {
    const joinWrap = useRef();
    const joinCloseBtn = useRef();
    const joinEmailInput = useRef();
    const joinEmailInputArea = useRef();
    const joinEmailSite = useRef();
    const joinEmailSelect = useRef();
    const joinEmailAuthArea = useRef();
    const joinEmailAuthCom = useRef();
    const joinEmailAuth = useRef();
    const joinEmailAuthTimer = useRef();
    const emailCheckBtn = useRef();
    const emailAuthBtn = useRef();
    const joinNameInput = useRef();
    const password = useRef();
    const rePassword = useRef();
    const nicknameWarn = useRef();
    const rePasswordWarn = useRef();
    const passwordWarn = useRef();
    
    const sites = [
        { id: 1, site: 'google.com' },
        { id: 2, site: 'naver.com' },
        { id: 3, site: 'daum.net' },
        { id: 4, site: '직접 입력' }
    ];

    const [emailSite, setEmailSite] = useState(sites[0].site);
    const [timeLeft, { start }] = useCountDown(600000);
    const [authKey, setAuthKey] = useState(0);
    let [nickname, setNickname] = useState('');
    const [passwords, setPasswords] = useState({password: '', rePassword: ''});

    // 모달창 닫기
    const joinModalClose = () => {
        if(joinWrap.current) {
            joinWrap.current.classList.add('hidden');
            joinEmailInputArea.current.classList.remove('hidden');
            emailCheckBtn.current.classList.remove('hidden');
            joinEmailAuthArea.current.classList.add('hidden');
            emailAuthBtn.current.classList.add('hidden');
            joinNameInput.current.value = '';
            joinEmailInput.current.value = '';
            joinEmailAuthCom.current.classList.add('hidden');
            joinEmailAuth.current.classList.remove('hidden');
            joinEmailAuth.current.value = '';
            password.current.value = '';
            rePassword.current.value = '';
            setAuthKey(0);
            setNickname('');
        }
    };

    // 이메일 주소 선택 or 입력
    const joinEmailValue = (e) => {
        console.log('value : ' + e.target.value);

        if(e.target.value !== sites[3].site) {
            joinEmailSite.current.classList.add('hidden');
            setEmailSite(e.target.value);
            console.log('emailSite : ' + emailSite);
        } else {
            joinEmailSite.current.classList.remove('hidden');
            joinEmailSite.current.focus();
            console.log('emailSite : ' + emailSite);
        }
    };

    // 이메일 인증 버튼
    const emailCheckApi = () => {
        let username = joinEmailInput.current.value;

        if (username === '') {
			alert("메일 주소가 입력되지 않았습니다.");
		} else {
            username += "@" + emailSite;

			axios.post('/api/user/joinAuth', {username})
            .then(res => {
                console.log("res.data : " + res.data);
                if(res.data === 1) {
                    alert('이미 가입된 이메일 입니다.');
                } else {
                    joinEmailInputArea.current.classList.add('hidden');
                    emailCheckBtn.current.classList.add('hidden');
                    joinEmailAuthArea.current.classList.remove('hidden');
                    emailAuthBtn.current.classList.remove('hidden');
                    joinEmailAuthArea.current.focus();
        
                    start();
                    
                    window.localStorage.setItem('authKey', res.data);
                    alert("인증번호가 전송되었습니다.");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        console.log('mail : ' + username);
    };

    // 이메일 인증 번호 입력 버튼
    const emailAuthApi = () => {
        if(window.localStorage.getItem('authKey') === authKey) {
            setAuthKey(0);
            window.localStorage.removeItem('authKey');
            emailAuthBtn.current.classList.add('hidden');
            joinEmailAuthTimer.current.classList.add('hidden');
            joinEmailAuth.current.classList.add('hidden');
            joinEmailAuthCom.current.classList.remove('hidden');
        } else {
            alert('다시 입력해 주세요.');
        }
    };

    // 닉네임 중복 검사
    // 닉네임 최소 두 글자 이상!
    const nicknameApi = (e) => {
        setNickname(nickname = e.target.value);

        console.log('nickname : '  + nickname);
        
        axios.post('/api/user/nickname', {nickname})
        .then(res => {
            if(res.data === 0) {
                console.log('사용 가능 : ' + nickname);
            } else {
                console.log('사용 불가 : ' + nickname);
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    // 비밀번호 검사
    const passwordApi = (e) => {
        setPasswords({
            ...passwords, [e.target.name] : e.target.value
        });
    };

    // 회원가입 버튼
    const joinApi = () => {
        const username = joinEmailInput.current.value + '@' + emailSite;
        const joinUser = { username, nickname, password : passwords.password };

        if(authKey === 0) {
            axios.post('/api/user/join', joinUser)
            .then(res => {
                joinModalClose();
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            alert('이메일을 인증하세요.');
        }
    };
    
    return (
        <div id="joinWrap" ref={joinWrap} className="join-wrap hidden">
            <div className="join-modal">
                <div ref={joinCloseBtn} className="join-modal-close" onClick={joinModalClose}>&times;</div>
                <h1 className="join-modal-title">JOIN</h1>

                <div className="join-modal-input">
                    <div className="join-text-area">
                        <span>이메일</span>
                        <span>닉네임</span>
                        <span>패스워드</span>
                        <span>패스워드 확인</span>
                    </div>

                    <div className="join-input-area">
                        <div ref={joinEmailInputArea} className="join-email-input-area">
                            <input id="joinEmailInput" ref={joinEmailInput} className="join-email-input" placeholder="이메일을 입력해주세요."></input>
                            <span>@</span>
                            <div className="join-email-site-area">
                                <input ref={joinEmailSite} className="join-email-site hidden" onChange={ e => setEmailSite(e.target.value) }></input>
                                <select ref={joinEmailSelect} className="join-email-select" onChange={ joinEmailValue }>
                                    {sites.map(item => <option key={item.id} value={item.site}>
                                        {item.site}</option>)}
                                </select>
                            </div>
                        </div>

                        <div ref={joinEmailAuthArea} className="join-email-auth-area hidden">
                            <span ref={joinEmailAuthCom} className="join-email-auth-com hidden">인증 완료</span>
                            <input ref={joinEmailAuth} className="join-email-auth" onChange={(e) => setAuthKey(e.target.value)} placeholder="인증번호를 입력해 주세요."></input>
                            <span ref={joinEmailAuthTimer} className="join-email-auth-timer">
                                {(parseInt(Math.floor(timeLeft / 60000)) < 10) ? ('0'+ parseInt(Math.floor(timeLeft / 60000))) : (parseInt(Math.floor(timeLeft / 60000)))} 
                                : 
                                {(parseInt(Math.floor(timeLeft / 1000) % 60) < 10) ? ('0'+ parseInt(Math.floor(timeLeft / 1000) % 60)) : (parseInt(Math.floor(timeLeft / 1000) % 60))} 
                            </span>
                        </div>

                        <input ref={joinNameInput} id="joinNameInput" onChange={ nicknameApi } placeholder="2글자 이상 10글자 이하"></input>
                        <input onChange={ passwordApi } ref={password} name="password" type="password" placeholder="패스워드를 입력해 주세요."></input>
                        <input onChange={ passwordApi } ref={rePassword} type="password" placeholder="패스워드를 다시 입력해 주세요."></input>
                    </div>
                
                    <div className="join-warn-area">
                        <div>
                            <div ref={emailCheckBtn} className="join-email-check-btn" onClick={ emailCheckApi }>인증하기</div>
                            <div ref={emailAuthBtn} className="join-email-auth-btn hidden" onClick={ emailAuthApi }>인증확인</div>
                        </div>
                        <span ref={nicknameWarn}></span>
                        <span ref={passwordWarn}></span>
                        <span ref={rePasswordWarn}></span>
                    </div>
                </div>

                <div id="joinBtn" className="join-modal-submit" onClick={ joinApi }>
                    회원가입
                </div>
            </div>
            <div className="join-wrap-back" onClick={ joinModalClose }></div>
        </div>
    );
}

export default Join;