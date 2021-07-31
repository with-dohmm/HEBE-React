import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainCard from '../Main/MainCard';
import '../../css/MyFav/MyFav.css';
const MyFav = (props) => {
  const iuser = props.match.params.iuser;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('/api/myFav', null, { params: {
      iuser: iuser
    } })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => { 
      console.log(error);
    })
  }, []);

  const renderingList = data.map((item) => 
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
    <div>
      <div className="page-title">
        <span>My Favorite</span>
      </div>
      <div className="my-fav-list">
        {renderingList}
      </div>
    </div>
  )
}

export default MyFav;