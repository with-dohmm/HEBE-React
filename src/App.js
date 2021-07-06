import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main/Main';
//import Diary from './components/Diary/Diary';
//import Write from './components/Diary/Write';
//import Frame from './components/ToDo/Frame';
//import Detail from './components/Diary/Detail';
import MyPage from './components/MyPage/MyPage';
import Join from './components/MyPage/Join';
import Login from './components/MyPage/Login';
import './css/Common/Common.css';

export const Authentication = React.createContext(null);

const App = () => {
  const [authorization, setAuthorization] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Login/>
        <Join />
        <Switch>
          <Route path={"/"} component={Main} exact={true} />
          {/*<Route path={"/todo"} component={Frame} />
          <Route path={"/diary/:uid"} component={Diary} />
          <Route path={"/write"} component={Write} />
          <Route path={"/detail/:iboard"} component={Detail} />*/}
          <Route path={"/myPage"} component={MyPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
