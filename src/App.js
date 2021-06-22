import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main/Main';
import Diary from './components/Diary/Diary';
import Frame from './components/ToDo/Frame';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path={"/"} exact={true}>
            <Main /> 
          </Route>
          <Route path={"/todo"} exact={true}>
            <Frame />
          </Route>
          <Route path={"/diary"} exact={true}>
            <Diary />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
