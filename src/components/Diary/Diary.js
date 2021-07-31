import React, { useState, useEffect } from 'react';
import '../../css/Diary/Diary.css';
import MainCard from '../Main/MainCard';
import axios from 'axios';

const Diary = (props) => {
  // let loginUserInfo = window.localStorage.getItem('loginUser');
  // loginUserInfo = JSON.parse(loginUserInfo);
  const [loginIuser, setLoginIuser] = useState(1);  // 수정 필수
  const iuser = props.match.params.iuser;
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(iuser);
    axios.post('/api/diary', null, { params: {
      iuser: iuser
    } })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleWrite = () => {
    return new Promise(
      (resolve, reject) => {
        axios.post('/api/preWrite', null, { params: {
          iuser: loginIuser,
          title: '제목을 입력해주세요.',
          content: '내용을 입력해주세요.',
        } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      }
    )
  }

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
    <div className="diary">
      <div className="page-title">
        <span>Diary</span>
        <img
          src={process.env.PUBLIC_URL + '/img/write_btn.svg'}
          onClick={() => {handleWrite().then((response) => {document.location.href = "/write";})}}
        >
        </img>
      </div>
      <div className="card-section">
        {renderingList}
      </div>
      <div className="calender-box">
      </div>
    </div>
  );
}

export default Diary;