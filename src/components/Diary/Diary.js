import React, { useState, useEffect } from 'react';
import '../../css/Diary/Diary.css';
import MainCard from '../Main/MainCard';
const axios = require('axios');

const Diary = (props) => {
  const uid = props.match.params.uid;
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(uid);
    axios.post('/api/diary', null, { params: {
      uid: uid
    } })
    .then(function(response) {
      console.log(response.data);
      setData(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }, []);

  const renderingList = data.map((item) => 
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
    <div className="diary">
      <div className="page-title">
        <span>Diary</span>
      </div>
      <div className="card-section">
        {renderingList}
      </div>
      <div className="calender-box">
        <a href="/write">작성</a>
      </div>
    </div>
  );
}

export default Diary;