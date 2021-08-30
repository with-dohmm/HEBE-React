import React from 'react';
import CardList from '../Common/CardList';
import GoTopBtn from '../Common/GoTopBtn';
import '../../css/MyFav/MyFav.css';

const MyFav = (props) => {
  const iuser = props.match.params.iuser;

  return ( 
    <div className="my-fav">
      <div className="page-title">
        <span>My Favorite</span>
      </div>
      <CardList menu="myFav" iuser={iuser} sort={null} />
      <GoTopBtn />
    </div>
  )
}

export default MyFav;