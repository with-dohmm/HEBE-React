import React, { useEffect, useState } from 'react';
import '../../css/Main/MainCard.css';

const MainCard = (props) => {
  const [iboard, setIboard] = useState(props.iboard);
  const [title, setTitle] = useState(props.title);
  const [nickname, setNickname] = useState(props.nickname);
  const [username, setUsername] = useState(props.username);
  const [regdt, setRegdt] = useState(props.regdt);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);
  const [favCnt, setFavCnt] = useState(props.favCnt);

  return (
    <div className="main-card" onClick={() => { document.location.href="/detail/" + iboard; }}>
      <div className="card-profile">
        <span className="profile-img"></span>
        <span className="profile-nm">{nickname}</span>
        <span className="like-num">{favCnt}</span>
        <span className="heart">♥</span>
      </div>
      <div className="card-img" 
        style={{ backgroundImage: `url(${thumbnail})`}}></div>
      <div className="card-ctnt">
        <div className="card-title">{title}</div>
        <div className="card-regdate">{regdt}</div>
      </div>
    </div>
  );
}

export default MainCard; 