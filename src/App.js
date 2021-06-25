import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main/Main';
// import Diary from './components/Diary/Diary';
import Frame from './components/ToDo/Frame';
import Join from './components/MyPage/Join';
import Login from './components/MyPage/Login';
import Common from './css/Common/Common.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Login />
        <Join />
        <Switch>
          <Route path={"/"} exact={true}>
            <Main /> 
          </Route>
          <Route path={"/todo"} exact={true}>
            <Frame />
          </Route>
          {/* <Route path={"/diary"} exact={true}>
            <Diary />
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
