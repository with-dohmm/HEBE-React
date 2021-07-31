import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
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

const isLogin = false;

const loginReducer = (state, action) => {
  switch(action.type) {
    case 'login': {
      return { isLogin: action.value }
    }
    case 'logout' : {
      return { isLogin: action.value }
    }
    default : {
      throw new Error();
    }
  }
}

export const LoginState = React.createContext();

const App = () => { // /diary, /myFav 수정 필수!
  const [state, dispatch] = useReducer(loginReducer, isLogin);

  useEffect(() => {
    if(window.localStorage.getItem('loginUser') !== null) {
      dispatch({type: 'login', value: true});
    } else {
      dispatch({type: 'login', value: false});
    }
  }, [])

  return (
      <div className="app">
        <LoginState.Provider value={{state, dispatch}}>
          <Header />
          <Login/>
          <Join/>
          <Switch>
            <Route path={"/"} component={Main} exact={true} />
            <Route path={"/myPage"} component={MyPage} exact={true} />
            <Route path={"/diary/:iuser"} component={Diary} />
            <Route path={"/todo"} component={Frame} />
            <Route path={"/write"} component={Write} />
            <Route path={"/detail/:iboard"} component={Detail} />
            <Route path={"/update/:iboard"} component={Update} />
            <Route path={"/myFav/:iuser"} component={MyFav} />
          </Switch>
        </LoginState.Provider>
      </div>
  );
}

export default App;
