import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Diary/DiaryCard.css';

const DiaryCard = (props) => {
  const [iboard, setIboard] = useState(props.iboard);
  const [title, setTitle] = useState(props.title);
  const [nickname, setNickname] = useState(props.nickname);
  const [regdt, setRegdt] = useState(props.regdt);
  const [profileimg, setProfileimg] = useState(props.profileimg);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);
  const [favCnt, setFavCnt] = useState(props.favCnt);

  return (
    <div className="diary-card">
      <Link to={'/detail/' + iboard}>
        <span 
          className="diary-card-thumbnail"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + thumbnail})` }}>
        </span>
        <div>
          <span className="diary-card-title">{title}</span>
          <div className="diary-card-profile">
            <span 
              className="diary-card-profile-img"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL + profileimg})` }}>
            </span>
            <span className="diary-card-nickname">{nickname}</span>
          </div>
          <span className="diary-card-regdate">{regdt}</span>
          <span className="diary-card-fav">
            <span className="diary-card-heart">♥ </span>
            <span className="diary-card-favCnt">{favCnt}</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export default DiaryCard;