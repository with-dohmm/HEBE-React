import React, { useState, useEffect, useCallback, useRef, useContext, useReducer } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/Common/Header.css';
import { LoginState } from './../../App';

const Header = () => {
  // const [sessionToggle, setSessionToggle] = useState(1);
  const [searchToggle, setSearchToggle] = useState(0);        // 검색창 모달 toggle
  const [leftMenuToggle, setLeftMenuToggle] = useState(0);    // 반응형 좌측 메뉴 toggle
  const [rightMenuToggle, setRightMenuToggle] = useState(0);  // 반응형 우측 메뉴 toggle
  const [searchNickname, setSearchNickname] = useState('');   // 검색창 input에 입력한 value가 담김
  // const [resultUser, setResultUser] = useState({});
  const [searchUserList, setSearchUserList] = useState([]);   // 검색 결과 유저 리스트
  const {state, dispatch} = useContext(LoginState);

  const searchInput = useRef();

  // join <-> my page btn toggle
  const myPageToggle = () => {
    if(state.isLogin) {
      console.log('myPage');
    } else {
      const joinWrapElem = document.querySelector('#joinWrap');
      const joinEmailInputElem = document.querySelector('#joinEmailInput');

      if(joinWrapElem) {
        joinWrapElem.classList.remove('hidden'); 
        joinEmailInputElem.focus();
      }
    }
  }

  // login <-> logout btn toggle
  const loginToggle = () => {
    if(state.isLogin) {      
      axios.post('/api/user/logout')
        .then(() => {
          window.localStorage.removeItem('loginUser');
          window.location.href = '/';
        })
        .catch(error => {
            console.log(error);
        });

    } else { 
      const loginWrapElem = document.querySelector('#loginWrap');
      const loginEmailInputElem = document.querySelector('#loginEmailInput');

      if(loginWrapElem) {
        loginWrapElem.classList.remove('hidden'); 
        loginEmailInputElem.focus();
      }
    }
  }

  // 반응형 메뉴 버튼 이벤트 활성화
  useEffect(() => {
    if (document.querySelector('.content') !== null) {
      document.querySelector('.content').addEventListener('click', () => {
        setLeftMenuToggle(0);
        setRightMenuToggle(0);
      });
    }
  }, []);

  // 검색창 input value 초기화
  const searchReset = () => {
    // document.querySelector('.search-input').value = '';
    searchInput.current.value = '';
  }

  // 검색 모달창 끄면 input value 초기화
  useEffect(() => {
    searchReset();
  }, [searchToggle]);

  // 유저 검색 api
  const apiSearch = () => {
    if (searchInput.current.value.length > 1) {
      axios.post('/api/search', null, { params: {
        nickname: searchNickname
      } })
      .then((response) => {
        if (response.data[0].nickname === undefined) {
          setSearchUserList([{nickname: '검색 결과가 없습니다.'}]); // 이 경우 클릭 이벤트 방지 코드 작성 필수
        } else {
          setSearchUserList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      searchReset();  // 검색창 input value 초기화
    } else {
      alert('2글자 이상 입력해주세요.');
    } 
  }

  // 검색한 유저 리스트
  const userList = searchUserList.map((item, i) => 
    <div 
      key={i}
      className="search-modal-profile"
      onClick={() => {document.location.href = "/diary/" + item.iuser}}
    >
      <img className={item.profileImg === undefined ? "search-modal-profileImg hidden" : "search-modal-profileImg"}
        src={process.env.PUBLIC_URL + item.profileImg}>
      </img>
      <span className="search-modal-profileContent">
        <span>{item.unm}</span>
        <span>{item.introduction}</span>
      </span>
    </div>
  )

  // 수정 필수 ( /diary/1 에서 1 대신 현재 로그인한 유저 iuser )
  return (
    <div className="header">
      <div className="mobile-menu">
        <i className="fas fa-bars" onClick={() => {setLeftMenuToggle(leftMenuToggle === 0 ? 1 : 0); setRightMenuToggle(0)}}></i>
      </div>
      <div className="logo"><Link to="/">HEBE</Link></div>
      <div className="header-center">
        <div>
          <span><Link to="/">Home</Link></span>
          <span><Link to="/todo">To Do</Link></span>
          <span><Link to={"/diary/1"}>My Diray</Link></span>
          <span><Link to="#">Favorite</Link></span>
        </div>
      </div>

      <div className={(leftMenuToggle === 0 ? 'left-hidden-menu' : 'left-hidden-menu display-inline-block')}>
        <span><Link to="/">Home</Link></span>
        <span><Link to="/todo">To Do</Link></span>
        <span><Link to={"/diary/1"}>My Diary</Link></span>
        <span><Link to="#">Favorite</Link></span>
      </div>

      <div className="header-right">
        <span id="myPageBtn" onClick={ myPageToggle }>{state.isLogin ? 'My Page' : 'Join'}</span>
        <span id="logoutBtn" onClick={ loginToggle }>{state.isLogin ? 'Log Out' : 'Log in'}</span>
        <i className="fas fa-search" onClick={() => setSearchToggle(searchToggle === 0 ? 1 : 0)}></i>
      </div>

      <div className="right-dot">
        <i className="fas fa-ellipsis-v" onClick={() => {setRightMenuToggle(rightMenuToggle === 0 ? 1 : 0); setLeftMenuToggle(0)}}></i>
      </div>
      
      <div className={(rightMenuToggle === 0 ? 'right-hidden-menu' : 'right-hidden-menu display-inline-block')}>       
        <div onClick={ loginToggle }>{state.isLogin ? 'Log Out' : 'Log in'}</div>
        <span></span>
        <div onClick={ myPageToggle }>{state.isLogin ? 'My Page' : 'Join'}</div>
        <div onClick={() => {setSearchToggle(searchToggle === 0 ? 1 : 0); setRightMenuToggle(0);}}>Search</div>
        <span></span>
      </div>

      <div 
        className={(searchToggle === 0 ? 'search-modal-background' : 'search-modal-background display-inline-block')}
        onClick={() => {
            setSearchToggle(searchToggle === 0 ? 1 : 0); 
            setSearchUserList([]);
            searchInput.current.value = '';
          }
        }  
      >
      </div>
      <div className={(searchToggle === 0 ? 'search-modal-box' : 'search-modal-box display-inline-block')}>
        <input 
          ref={searchInput}
          className="search-input" 
          type="text" 
          placeholder="search user" 
          onChange={(e) => setSearchNickname(e.target.value)}
          onKeyPress={(e) => {if (e.key === 'Enter') {apiSearch()}}}
        >
        </input>
        <i className="fas fa-search" onClick={apiSearch}></i>
        {userList}
      </div>
    </div>
  );
}

export default Header;