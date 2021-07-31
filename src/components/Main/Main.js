import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainCard from './MainCard';
import GoTopBtn from '../Common/GoTopBtn';
import '../../css/Main/Main.css';
import axios from 'axios';

const Main = () => {
  const [popularOrRecent, setPopularOrRecent] = useState(0);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 인기순 - 최신순 func
  const popularOrRecentHandler = (e) => {
    setPopularOrRecent((e.target.className.indexOf('popular-list-btn') !== -1 ? 0 : 1));
  } 

  // ============================= infinite scroll ================================
  const getMoreData = async() => {
    setIsLoading(true);
    setResult(result.concat(data.slice(0, 20)));  // 20개 추가
    setData(data.slice(20));  // 추가한 20개의 데이터 삭제
    setIsLoading(false);
  }
  
  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      getMoreData();
    }
  }, [isLoading]);

  const getList = async() => { // 맨 처음에만 실행. DB에서 데이터를 가져옴 (isLoading = true)
    const path = (popularOrRecent === 0 ? 'popular' : 'recent');
    console.log(path);
    await axios.post('/api/main/' + path)
    .then((response) => {
      let list = response.data;     // 데이터를 가지고 와서
      setResult(list.slice(0, 20)); // 먼저 보여줄 20개의 데이터를 담아주고
      list = list.slice(20);        // 위 20개의 데이터를 제외한 데이터를
      setData(list);                // data라는 저장소에 담아둠
      setIsLoading(false);          // 데이터 로딩이 끝났으니 false로 변경
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  useEffect(() => {
    setIsLoading(true); // data를 로딩할테니 true로 변경
    getList();
  }, [popularOrRecent]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);
  // ==============================================================================

  const renderingList = result.map((item) => 
    <MainCard 
      key={item.iboard}
      iboard={item.iboard}
      title={item.title}
      regdt={item.regdt}
      favCnt={item.favCnt}
      nickname={item.nickname} 
      username={item.username}
      thumbnail={item.thumbnail}
    />
  );

  return (
    <div className="content">
      <div className="content-header">
        <span className="list-title">{popularOrRecent === 0 ? 'Most Popular' : 'Latest Posts'}</span>
        <span onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'recent-list-btn btn-no-clicked' : 'recent-list-btn btn-clicked'}>최신글</span>
        <span onClick={popularOrRecentHandler} className={popularOrRecent === 0 ? 'popular-list-btn btn-clicked' : 'popular-list-btn btn-no-clicked'}>인기글</span>
      </div>
      <div className="item-list">
        {renderingList}
      </div>
      <GoTopBtn />
    </div>
  );
}

export default Main;
