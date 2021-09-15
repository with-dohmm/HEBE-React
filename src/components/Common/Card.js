import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Common/Card.css';

const Card = (props) => {
  const [iboard, setIboard] = useState(props.iboard);
  const [title, setTitle] = useState(props.title);
  const [nickname, setNickname] = useState(props.nickname);
  const [regdt, setRegdt] = useState(props.regdt);
  const [profileimg, setProfileimg] = useState(props.profileimg);
  const [thumbnail, setThumbnail] = useState(props.thumbnail);
  const [favCnt, setFavCnt] = useState(props.favCnt);

  return (
    <div className="card">
      <Link to={"/detail/" + iboard}>
        <div className="card-profile">
          <span className="profile-img"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + profileimg})` }}></span>
          <span className="profile-nm">{nickname}</span>
          <span className="like-num">{favCnt}</span>
          <span className="heart">♥</span>
        </div>
        <div className="card-img" 
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + thumbnail})` }}></div>
        <div className="card-ctnt">
          <div className="card-title">{title}</div>
          <div className="card-regdate">{regdt}</div>
        </div>
      </Link>
    </div>
  );
}

export default Card; 