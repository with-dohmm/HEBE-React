import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import axios from 'axios';
import '../../css/Common/CardList.css';

const CardList = ({menu, sort, iuser}) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    let apiPath;
    let param;

    if (menu === 'main') {
      apiPath = '/api/main/' + sort;
      param = null;
    } else {
      apiPath = '/api/' + menu;
      param = { params: { iuser: iuser } }
    }

    await axios.post(apiPath, null, param)
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
    setIsLoading(true); // 로딩 상태 -> true
    getList();
  }, [sort]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  const renderingList = result.map((item) => 
    <Card 
      key={item.iboard}
      iboard={item.iboard}
      title={item.title}
      regdt={item.regdt}
      favCnt={item.favCnt}
      nickname={item.nickname} 
      username={item.username}
      profileimg={item.profileimg}
      thumbnail={item.thumbnail}
    />
  );

  return (
    <div className="item-list">
      {renderingList}
    </div>
  );
}

export default CardList;
