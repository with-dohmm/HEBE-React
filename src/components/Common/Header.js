import React, { useState } from 'react';
import '../../css/Common/Header.css';

const Header = () => {
  const [sessionToggle, setSessionToggle] = useState(1);
  const [searchToggle, setSearchToggle] = useState(0);

  const myPageToggle = () => {
    sessionToggle === 1 ? 
    window.location.href='/myPage' :  
    document.querySelector('#joinWrap').classList.remove('hidden'); 
    document.querySelector('#joinEmailInput').focus();
  }

  const loginToggle = () => {
    sessionToggle === 1 ? 
    setSessionToggle(0) :  
    document.querySelector('#loginWrap').classList.remove('hidden'); 
    document.querySelector('#loginEmailInput').focus();
  }

  return (
    <div id="header">
      <div id="mobileMenu"><i className="fas fa-bars"></i></div>
      <div id="logo">HEBE</div>
      <div id="headerCenter">
        <div>
          <span><a href="/">Home</a></span>
          <span><a href="/todo">To Do</a></span>
          <span><a href="/diary">My Diary</a></span>
          <span><a href="favorite">Favorite</a></span>
        </div>
      </div>
      <div id="headerRight">
      <span id="myPageBtn" onClick={ myPageToggle }>{sessionToggle === 1 ? 'My Page' : 'Join'}</span>
      <span id="logoutBtn" onClick={ loginToggle }>{sessionToggle === 1 ? 'Log Out' : 'Log in'}</span>
        <i className="fas fa-search" onClick={() => setSearchToggle(searchToggle === 0 ? 1 : 0)}></i>
      </div>
      <div id="rightDot"><i className="fas fa-ellipsis-v"></i></div>
      <div className="right-hidden-menu">
        <span id="myPageBtn" onClick={ myPageToggle }>{sessionToggle === 1 ? 'My Page' : 'Join'}</span>
        <span id="myPageBtn" onClick={ myPageToggle }>{sessionToggle === 1 ? 'My Page' : 'Join'}</span>
      </div>
      <div 
        className={(searchToggle === 0 ? 'search-modal-background' : 'search-modal-background display-inline-block')}
        onClick={() => setSearchToggle(searchToggle === 0 ? 1 : 0)}  
      >
      </div>
      <div className={(searchToggle === 0 ? 'search-modal-box' : 'search-modal-box display-inline-block')}>
        <input type="text" placeholder="search user"></input>
        <span>search</span>
        <div className="search-modal-profile">
          <span className="search-modal-profileImg"></span>
          <span className="search-modal-profileId">jun17183</span>
        </div>
      </div>
    </div>
  );
}

export default Header;