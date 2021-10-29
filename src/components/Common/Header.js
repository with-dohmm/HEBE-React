import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../css/Common/Header.css';
import { LoginInfoContext } from './../../App';
import { useGoogleLogout } from 'react-google-login';

const Header = ({ setOpenLoginModal, setOpenJoinModal, leftMenuToggle, rightMenuToggle, setLeftMenuToggle, setRightMenuToggle }) => {
  const [searchToggle, setSearchToggle] = useState(0);        // 검색창 모달 toggle
  const [searchNickname, setSearchNickname] = useState('');   // 검색창 input에 입력한 value가 담김
  const [searchUserList, setSearchUserList] = useState([]);   // 검색 결과 유저 리스트
  
  const loginUserInfo = useContext(LoginInfoContext);  // 로그인 유저 정보
  const searchInput = useRef(); // 검색창 input 태그
  const history = useHistory();
  const { signOut } = useGoogleLogout({
    clientId : '1032001853934-78dmac7kurqos5r8bpvs9hen0afa8bgv.apps.googleusercontent.com',
  });

  // login <-> logout btn toggle
  const loginToggle = () => {
    if(loginUserInfo.isLogin) {      
      if(loginUserInfo.provider === 'google') {
        signOut();
      };
      
      if(loginUserInfo.provider === 'kakao') {
        window.Kakao.Auth.logout();
      }

      axios.post('/api/user/logout')
      .then(() => {
        window.localStorage.clear();
        window.location.reload();
      })
      .catch(error => {
          console.log(error);
      });
    } else { 
      setOpenLoginModal(true);
    }
  }

  // 검색창 input value 초기화
  const searchReset = () => {
    searchInput.current.value = '';
  }

  // 검색 모달창 끄면 input value 초기화
  useEffect(() => {
    searchReset();
    searchInput.current.focus();
  }, [searchToggle]);

  // 유저 검색 api
  const apiSearch = () => {
    if (searchInput.current.value.length > 1) { // 두 글자부터 검색 가능
      axios.post('/api/search', null, { params: {
        nickname: searchNickname
      } })
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setSearchUserList([{ nickname: '결과 없음' }]);
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
    (searchUserList[0].nickname !== '결과 없음' 
    ? 
      <div 
        key={i}
        className="search-modal-profile"
        onClick={() => { history.push('/diary/' + item.iuser); setSearchToggle(0); }}
      >
        <img className="search-modal-profileimg"
          src={process.env.PUBLIC_URL + item.profileimg}>
        </img>
        <span className="search-modal-profileContent">
          <span>{item.nickname}</span>
          <span>{item.introduction}</span>
        </span>
      </div>
    : <div key={i} className="search-modal-noResult">
        검색 결과가 없습니다.
      </div>
    )
  );

  return (
    <div className="header">
      {/* 왼쪽 반응형 메뉴 아이콘 */}
      <div className="mobile-menu">
        <i 
          className="fas fa-bars" 
          onClick={() => { setLeftMenuToggle(leftMenuToggle ? false : true); setRightMenuToggle(false); } 
        }>
        </i>
      </div>

      {/* 로고 */}
      <div className="logo"><Link to="/">HEBE</Link></div>

      {/* 가운데 메뉴 */}
      <div className="header-center">
        <div>
          {loginUserInfo.isLogin 
          ? <>
            <span><Link to="/">Home</Link></span>
            <span><Link to="/todo">To Do</Link></span>
            <span><Link to={"/diary/" + loginUserInfo.iuser}>My Diray</Link></span>
            <span><Link to={"/myFav/" + loginUserInfo.iuser}>Favorite</Link></span>
            </>
          : <>
            <span><Link to="/">Home</Link></span>
            <span><a onClick={() => { setOpenLoginModal(true) }}>To Do</a></span>
            <span><a onClick={() => { setOpenLoginModal(true) }}>My Diray</a></span>
            <span><a onClick={() => { setOpenLoginModal(true) }}>Favorite</a></span>
            </>}
        </div>
      </div>

      {/* 왼쪽 반응형 메뉴 */}
      {leftMenuToggle 
      ? <div 
          className="left-hidden-menu"
          onClick={() => { setLeftMenuToggle(false); }}
        >
        {loginUserInfo.isLogin 
          ? <>
            <span><Link to="/">Home</Link></span>
            <span><Link to="/todo">To Do</Link></span>
            <span><Link to={"/diary/" + loginUserInfo.iuser}>My Diray</Link></span>
            <span><Link to={"/myFav/" + loginUserInfo.iuser}>Favorite</Link></span>
            </>
          : <>
            <span><Link to="/">Home</Link></span>
            <span onClick={() => { setOpenLoginModal(true) }}>To Do</span>
            <span onClick={() => { setOpenLoginModal(true) }}>My Diray</span>
            <span onClick={() => { setOpenLoginModal(true) }}>Favorite</span>
            </>}
        </div> 
      : <></>}

      {/* 오른쪽 메뉴 */}
      <div className="header-right">
        {loginUserInfo.isLogin 
        ? <>
            <span id="myPageBtn"><Link to="/myPage">My Page</Link></span>
            <span id="logoutBtn" onClick={ loginToggle }>Log out</span>
          </>
        : <>
            <span id="myPageBtn" onClick={() => { setOpenJoinModal(true) }}>Join</span>
            <span id="logoutBtn" onClick={ loginToggle }>Log in</span>
          </>
        }
        <i className="fas fa-search" onClick={() => setSearchToggle(searchToggle === 0 ? 1 : 0)}></i>
      </div>

      {/* 오른쪽 반응형 메뉴 아이콘 */}
      <div className="right-dot">
        <i 
          className="fas fa-ellipsis-v" 
          onClick={() => { setRightMenuToggle(rightMenuToggle ? false : true); setLeftMenuToggle(false); }}
        >
        </i>
      </div>

      {/* 오른쪽 반응형 메뉴 */}
      {rightMenuToggle
      ? <div 
          className='right-hidden-menu'
          onClick={() => { setRightMenuToggle(false); }}
        >     
        {loginUserInfo.isLogin 
          ? <>
              <div onClick={ loginToggle }>{loginUserInfo.isLogin ? 'Log Out' : 'Log in'}</div>
              <span></span>
              <div><Link to="/myPage">My Page</Link></div>
              <span></span>
            </>
          : <>
              <div onClick={ loginToggle }>{loginUserInfo.isLogin ? 'Log Out' : 'Log in'}</div>
              <span></span>
              <div onClick={() => { setOpenJoinModal(true); }}>Join</div>
              <span></span>
            </>
        }
          <div onClick={() => { setSearchToggle(searchToggle === 0 ? 1 : 0); setRightMenuToggle(0); }}>Search</div>
        </div>
      : <></>}

      {/* 검색 모달창 뒷 배경 */}
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

      {/* 검색 모달창 */}
      <div className={(searchToggle === 0 ? 'search-modal-box' : 'search-modal-box display-inline-block')}>
        <input 
          ref={searchInput}
          className="search-input" 
          type="text" 
          placeholder="search user" 
          onChange={(e) => setSearchNickname(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') { apiSearch(); } }}
        >
        </input>
        <i className="fas fa-search" onClick={ apiSearch }></i>
        {userList}
      </div>
    </div>
  );
}

export default Header;