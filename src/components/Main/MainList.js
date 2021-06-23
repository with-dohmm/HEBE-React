import React, { useState, useEffect } from 'react';
import MainCard from './MainCard';
import apiAxios from '../Common/apiAxios';
import '../../css/Main/Main.css';

const Main = () => {
  const [popularOrRecent, setPopularOrRecent] = useState(0);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [items, setItems] = useState(20);
  const [preItems, setPreItems] = useState(0);

  const getData = (data) => {
    setData(data);
  }

  const listSlice = () => {
    const temp = data.slice(preItems, items);
    setList([...list, ...temp]);
  }

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPreItems(items);
      setItems(items + 20);
      
      listSlice();
    }
  }

  const popularOrRecentHandler = (e) => {
    setPopularOrRecent((e.target.id === 'popularListBtn' ? 0 : 1));
  } 

  useEffect(() => {
    const path = (popularOrRecent == 0 ? 'popular' : 'recent');
    apiAxios('/main/' + path, getData);
    listSlice();
  }, [popularOrRecent]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
  }, []);


  const renderingList = list.map((item) => 
    <MainCard 
      key={item.iboard}
      title={item.title}
      regdt={item.regdt}
      favCnt={item.favCnt}
      unm={item.unm}
      uid={item.uid}
      thumbnail={item.thumbnail}
    />
  );

  return (
    <div id="content">
      <div id="content-header">
        <span id="listTitle">{popularOrRecent === 0 ? 'Most Popular' : 'Latest Posts'}</span>
        <span id="recentListBtn" onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'btn-no-clicked' : 'btn-clicked'}>최신글</span>
        <span id="popularListBtn" onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'btn-clicked' : 'btn-no-clicked'}>인기글</span>
      </div>
      <div id="itemList">
        {renderingList}
      </div>
    </div>
  );
}

export default Main;