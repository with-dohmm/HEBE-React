import React, { useState } from 'react';
import CardList from '../Common/CardList';
import GoTopBtn from '../Common/GoTopBtn';
import '../../css/Main/Main.css';

const Main = () => {
  const [popularOrRecent, setPopularOrRecent] = useState(0);

  // 인기순 - 최신순 handler
  const popularOrRecentHandler = (e) => {
    setPopularOrRecent((e.target.className.indexOf('popular-list-btn') !== -1 ? 0 : 1));
  }

  return (
    <div className="content">
      <div className="content-header">
        <span className="list-title">{popularOrRecent === 0 ? 'Most Popular' : 'Latest Posts'}</span>
        <span onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'recent-list-btn btn-no-clicked' : 'recent-list-btn btn-clicked'}>최신글</span>
        <span onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'popular-list-btn btn-clicked' : 'popular-list-btn btn-no-clicked'}>인기글</span>
      </div>
      {
        popularOrRecent === 0 
        ? <CardList menu="main" iuser={null} sort="popular" />
        : <CardList menu="main" iuser={null} sort="recent" />
      }
      <GoTopBtn />
    </div>
  );
}

export default Main;
