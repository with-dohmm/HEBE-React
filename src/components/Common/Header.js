import React, { useState, useEffect } from 'react';
import '../../css/Common/Header.css';
const axios = require('axios');

const Header = () => {
  const [sessionToggle, setSessionToggle] = useState(1);
  const [searchToggle, setSearchToggle] = useState(0);
  const [leftMenuToggle, setLeftMenuToggle] = useState(0);
  const [rightMenuToggle, setRightMenuToggle] = useState(0);
  const [searchUid, setSearchUid] = useState('');
  const [resultUser, setResultUser] = useState({});

  useEffect(() => {
    if (document.querySelector('#content') !== null) {
      document.querySelector('#content').addEventListener('click', () => {
        setLeftMenuToggle(0);
        setRightMenuToggle(0);
      });
    }
  }, []);

  const apiSearch = () => {
    axios.post('/api/search', null, { params: {
      uid: searchUid
    } })
    .then(function(response) {
      console.log(response.data);
      console.log(response.data.uid);
      if (response.data.uid === undefined) {
        setResultUser({uid: '검색 결과가 없습니다.'});
      } else {
        setResultUser(response.data);
      }
    })
    .catch(function(error) {
      console.log(error);
    })
    document.querySelector('#searchInput').value = '';
  }

  return (
    <div id="header">
      <div id="mobileMenu"><i className="fas fa-bars" onClick={() => {setLeftMenuToggle(leftMenuToggle === 0 ? 1 : 0); setRightMenuToggle(0)}}></i></div>
      <div id="logo">HEBE</div>
      <div id="headerCenter">
        <div>
          <span><a href="/">Home</a></span>
          <span><a href="/todo">To Do</a></span>
          <span><a href="/diary">My Diray</a></span>
          <span><a href="#">Favorite</a></span>
        </div>
      </div>
      <div className={(leftMenuToggle === 0 ? 'left-hidden-menu' : 'left-hidden-menu display-inline-block')}>
        <span><a href="/">Home</a></span>
        <span><a href="/todo">To Do</a></span>
        <span><a href="/diary">My Diray</a></span>
        <span><a href="#">Favorite</a></span>
      </div>
      <div id="headerRight">
        <span id="myPageBtn"><a href="#">{sessionToggle === 1 ? 'My Page' : 'Join'}</a></span>
        <span id="logoutBtn"><a href="#">{sessionToggle === 1 ? 'Log out' : 'Log in'}</a></span>
        <i className="fas fa-search" onClick={() => setSearchToggle(searchToggle === 0 ? 1 : 0)}></i>
      </div>
      <div id="rightDot"><i className="fas fa-ellipsis-v" onClick={() => {setRightMenuToggle(rightMenuToggle === 0 ? 1 : 0); setLeftMenuToggle(0)}}></i></div>
      <div className={(rightMenuToggle === 0 ? 'right-hidden-menu' : 'right-hidden-menu display-inline-block')}>
        <div>My Page</div>
        <span></span>
        <div onClick={() => {setSearchToggle(searchToggle === 0 ? 1 : 0); setRightMenuToggle(0);}}>Search</div>
        <span></span>
        <div>Log out</div>
      </div>
      <div 
        className={(searchToggle === 0 ? 'search-modal-background' : 'search-modal-background display-inline-block')}
        onClick={() => {setSearchToggle(searchToggle === 0 ? 1 : 0); setResultUser({});}}  
      >
      </div>
      <div className={(searchToggle === 0 ? 'search-modal-box' : 'search-modal-box display-inline-block')}>
        <input id="searchInput" type="text" placeholder="search user" onChange={(e) => setSearchUid(e.target.value)}></input>
        <span onClick={apiSearch}>search</span>
        <div className="search-modal-profile">
          <img className={resultUser.profileImg === undefined ? "search-modal-profileImg hidden" : "search-modal-profileImg"}
            src={`${process.env.PUBLIC_URL + '/img' + resultUser.profileImg}`}></img>
          <span className="search-modal-profileId">{resultUser.uid}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;