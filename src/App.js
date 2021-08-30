import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main/Main';
import Diary from './components/Diary/Diary';
import Write from './components/Diary/Write';
import Frame from './components/ToDo/Frame';
import Detail from './components/Diary/Detail';
import Update from './components/Diary/Update';
import MyFav from './components/MyFav/MyFav';
import MyPage from './components/MyPage/MyPage';
import Join from './components/MyPage/Join';
import Login from './components/MyPage/Login';
import './css/Common/Common.css';

const loginUser = JSON.parse(window.localStorage.getItem('loginUser'));
let loginUserInfo = {};

if(loginUser !== null) {
  loginUserInfo = {
    isLogin:true, 
    iuser:loginUser.iuser, 
    nickname: loginUser.nickname, 
    introduction: loginUser.introduction, 
    profileimg: loginUser.profileimg, 
    provider: loginUser.provider
  };
}

export const LoginInfoContext = React.createContext(loginUserInfo);

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [leftMenuToggle, setLeftMenuToggle] = useState(false);
  const [rightMenuToggle, setRightMenuToggle] = useState(false);

  useEffect(() => {
    if(loginUser !== null) {
      console.log('로그인 성공');
      loginUserInfo = {
        isLogin:true, 
        iuser:loginUser.iuser, 
        nickname: loginUser.nickname, 
        introduction: loginUser.introduction, 
        profileimg: loginUser.profileimg, 
        provider: loginUser.provider
      };
      console.log('loginUserInfo.isLogin : ' + loginUserInfo.isLogin);
    } else {
      console.log('로그인 실패');
    }
  }, []);

  const leftMenuController = (e) => {
    if (e.target.className !== 'left-hidden-menu'
      || e.target.className !== 'fa-bars') {
        if (leftMenuToggle) {
          setLeftMenuToggle(false);
        }
    }
  }

  const rightMenuController = (e) => {
    if (e.target.className !== 'right-hidden-menu'
      || e.target.className !== 'right-dot'
      || e.target.className !== 'fa-ellipsis-v') {
        if (rightMenuToggle) {
          setRightMenuToggle(false);
        }
    }
  }

  return (
      <div className="app" onClick={(e) => { leftMenuController(e); rightMenuController(e); }}>
        <LoginInfoContext.Provider value={loginUserInfo}>
          <Header 
            setOpenLoginModal={setOpenLoginModal} 
            setOpenJoinModal={setOpenJoinModal} 
            leftMenuToggle={leftMenuToggle}
            rightMenuToggle={rightMenuToggle}
            setLeftMenuToggle={setLeftMenuToggle}
            setRightMenuToggle={setRightMenuToggle}
          />
          <Login openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} />
          <Join openJoinModal={openJoinModal} setOpenJoinModal={setOpenJoinModal} />
          <Route path={"/"} component={Main} exact={true} />

          {loginUserInfo.isLogin ?
          <Switch>
            <Route path={"/myPage"} component={MyPage} />
            <Route path={"/todo"} component={Frame} />
            <Route path={"/update/:iboard"} component={Update} />
            <Route path={"/myFav/:iuser"} component={MyFav} />
            <Route path={"/write"} component={Write} />
            <Route path={"/diary/:iuser"} component={Diary} />
            <Route path={"/detail/:iboard"} component={Detail} />
          </Switch>
          :  
          <Switch>
            <Redirect exact from="/myPage" to="/"/>
            <Redirect exact from="/todo" to="/"/>
            <Redirect exact from="/update/:iboard" to="/"/>
            <Redirect exact from="/myFav/:iuser" to="/"/>
            <Redirect exact from="/write" to="/"/>
            <Redirect exact from="/diary/0" to="/"/>
            <Route path={"/diary/:iuser"} component={Diary} />
            <Route path={"/detail/:iboard"} component={Detail} />
          </Switch>
        }
        </LoginInfoContext.Provider>
      </div>
  );
}

export default App;