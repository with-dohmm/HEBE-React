import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main/Main';
import Diary from './components/Diary/Diary';
import Write from './components/Diary/Write';
import Frame from './components/ToDo/Frame';
import Detail from './components/Diary/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path={"/"} component={Main} exact={true} />
          <Route path={"/todo"} component={Frame} />
          <Route path={"/diary/:uid"} component={Diary} />
          <Route path={"/write"} component={Write} />
          <Route path={"/detail/:iboard"} component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
