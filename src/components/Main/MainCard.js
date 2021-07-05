import React, { useEffect, useState } from 'react';
import '../../css/Main/MainCard.css';

const MainCard = (props) => {
  const [iboard, setIboard] = useState(props.iboard);
  const [title, setTitle] = useState(props.title);
  const [unm, setUnm] = useState(props.unm);
  const [uid, setUid] = useState(props.uid);
  const [regdt, setRegdt] = useState(props.regdt);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);
  const [favCnt, setFavCnt] = useState(props.favCnt);

  return (
    <div className="mainCard" onClick={() => { document.location.href="/detail/" + iboard; }}>
      <div className="cardProfile">
        <span className="profileImg"></span>
        <span className="profileId">{uid}</span>
        <span className="likeNum">{favCnt}</span>
        <span className="heart">♥</span>
      </div>
      <div className="cardImg" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img' + thumbnail})` }}></div>
      <div className="cardCtnt">
        <div className="cardTitle">{title}</div>
        <div className="cardRegdate">{regdt}</div>
      </div>
    </div>
  );
}

export default MainCard; 