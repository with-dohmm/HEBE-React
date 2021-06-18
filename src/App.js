import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Main from './components/Main/Main';
import Frame from './components/ToDo/Frame';
import Header from './components/Common/Header';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path={"/"} exact={true}>
            <Main /> 
          </Route>
          <Route path={"/todo"} exact={true}>
            <Frame />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
