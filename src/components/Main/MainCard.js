import React, { useState } from 'react';
import '../../css/MainCard.css';

const MainCard = () => {

  return (
    <div className="mainCard">
      <div className="cardProfile">
        <span className="profileImg"></span>
        <span className="profileId">jun17183</span>
        <span className="likeNum">3</span>
        <span className="heart">♥</span>
      </div>
      <div className="cardImg"></div>
      <div className="cardCtnt">
        <div className="cardTitle">글 제목</div>
        <div className="cardRegdate">2021-06-07</div>
      </div>
    </div>
  );
}

export default MainCard; 