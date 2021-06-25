import React, { useState } from 'react';
import './../../css/MyPage/Join.css';

const Join = () => {
    const joinModalClose = () => {
        document.querySelector('#joinWrap').classList.add('hidden');
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
                        <input id="joinEmailInput" className="join-input" placeholder="이메일을 입력해주세요."></input>
                        <input id="joinNameInput" className="join-input" placeholder="닉네임을 입력해주세요."></input>
                        <input id="joinPwInput" className="join-input" placeholder="패스워드를 입력해주세요."></input>
                        <input id="joinRePwInput" className="join-input" placeholder="패스워드를 다시 입력핸주세요."></input>
                    </div>
                
                    <div className="join-email-check">
                        <div id="emailCheck" className="join-email-check-btn">인증하기</div>
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