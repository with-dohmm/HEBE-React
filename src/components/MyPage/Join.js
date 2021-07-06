import axios from 'axios';
import React, { useState } from 'react';
import './../../css/MyPage/Join.css';

const Join = () => {
    const sites = [
        { id: 1, site: 'google.com' },
        { id: 2, site: 'naver.com' },
        { id: 3, site: 'daum.net' },
        { id: 4, site: '직접 입력' }
    ];

    const [emailSite, setEmailSite] = useState(sites[0].site);

    const joinModalClose = () => {
        document.querySelector('#joinWrap').classList.add('hidden');
    }

    const joinEmailValue = (e) => {
        const joinEmailSite =  document.querySelector('#joinEmailSite');
        console.log('value : ' + e.target.value);

        if(e.target.value !== sites[3].site) {
            joinEmailSite.classList.add('hidden');
            setEmailSite(e.target.value);
            console.log('emailSite : ' + emailSite);
        } else {
            joinEmailSite.classList.remove('hidden');
            document.querySelector('#joinEmailSite').focus();
            console.log('emailSite : ' + emailSite);
        }
    }

    const emailCheckApi = () => {
        let mail = document.querySelector('#joinEmailInput').value;

        if (mail === '') {
			alert("메일 주소가 입력되지 않았습니다.");
		} else {
			mail = mail + "@" + emailSite;
			axios.post('/user/emailCheck', null, { params : {
			    mail: mail
            }})
            .then((res) => {
                console.log('key : ' + res.data);
            })
            .catch(error => {
                console.log(error);
            });
			// isCertification=true; //추후 인증 여부를 알기위한 값
            alert("인증번호가 전송되었습니다.");
        }
        console.log('mail : ' + mail);
    }
    
    return (
        <div id="joinWrap" className="join-wrap hidden">
            <div className="join-modal">
                <div id="joinCloseBtn" className="join-modal-close" onClick={joinModalClose}>&times;</div>
                <h1 className="join-modal-title">JOIN</h1>

                <div className="join-modal-input">
                    <div className="join-text-area">
                        <span>이메일</span>
                        <span>닉네임</span>
                        <span>패스워드</span>
                        <span>패스워드 확인</span>
                    </div>

                    <div className="join-input-area">
                        <div className="join-email-input-area">
                            <input id="joinEmailInput" className="join-email-input" type="email" placeholder="이메일을 입력해주세요."></input>
                            <span>@</span>
                            <div className="join-email-site-area">
                                <input id="joinEmailSite" className="join-email-site hidden" onChange={ (e) => setEmailSite(e.target.value) }></input>
                                <select id="joinEmailSelect" className="join-email-select" onChange={ joinEmailValue }>
                                    {sites.map(item => <option key={item.id} value={item.site}>
                                        {item.site}</option>)}
                                </select>
                            </div>
                        </div>
                        <input id="joinNameInput" placeholder="닉네임을 입력해주세요."></input>
                        <input id="joinPwInput" placeholder="패스워드를 입력해주세요."></input>
                        <input id="joinRePwInput" placeholder="패스워드를 다시 입력핸주세요."></input>
                    </div>
                
                    <div className="join-email-check">
                        <div id="emailCheck" className="join-email-check-btn" onClick={ emailCheckApi }>인증하기</div>
                    </div>
                </div>

                <div id="joinBtn" className="join-modal-submit">
                    회원가입
                </div>
            </div>
            <div className="join-wrap-back" onClick={ joinModalClose }></div>
        </div>
    );
}

export default Join;