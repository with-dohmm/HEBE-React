import React, { useState } from 'react';
import '../../css/Common/Header.css';

const Header = () => {
  const [sessionToggle, setSessionToggle] = useState(1);

  return (
    <div id="header">
      <div id="mobileMenu"><i className="fas fa-bars"></i></div>
      <div id="logo">HEBE</div>
      <div id="headerCenter">
        <div>
          <span><a href="/">Home</a></span>
          <span><a href="/todo">To Do</a></span>
          <span><a href="/diary">My Diray</a></span>
          <span><a href="#">Favorite</a></span>
        </div>
      </div>
      <div id="headerRight">
        <span id="myPageBtn"><a href="#">{sessionToggle === 1 ? 'My Page' : 'Join'}</a></span>
        <span id="logoutBtn"><a href="#">{sessionToggle === 1 ? 'Log out' : 'Log in'}</a></span>
        <i className="fas fa-search"></i>
      </div>
      <div id="rightDot"><i className="fas fa-ellipsis-v"></i></div>
    </div>
  );
}

export default Header;