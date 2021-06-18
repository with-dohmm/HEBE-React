import React, { useState, useEffect } from 'react';
import MainCard from './MainCard';
import '../../css/Main/Main.css';

const Main = () => {
  const [popularOrRecent, setPopularOrRecent] = useState(0);

  const popularOrRecentHandler = (e) => {
    setPopularOrRecent((e.target.id === 'popularListBtn' ? 0 : 1));
  } 

  return (
    <div id="content">
      <div id="content_header">
        <span id="listTitle">{popularOrRecent === 0 ? 'Most Popular' : 'Latest Posts'}</span>
        <span id="recentListBtn" onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'btnNoClicked' : 'btnClicked'}>최신글</span>
        <span id="popularListBtn" onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'btnClicked' : 'btnNoClicked'}>인기글</span>
      </div>
      <div id="itemList">
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
        <MainCard></MainCard>
      </div>
    </div>
  );
}

export default Main;