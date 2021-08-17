import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardList from '../Common/CardList';
import DiaryCard from './DiaryCard';
import GoTopBtn from '../Common/GoTopBtn';
import axios from 'axios';
import { LoginInfo } from './../../App';
import '../../css/Diary/Diary.css';
import Pagination from './Pagination';

const Diary = (props) => {
  const [nomarlOrCard, setNormalOrCard] = useState(0);
  const [data, setData] = useState([]);
  const [allDataLength, setAllDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);  // 최근 페이지 번호
	const postsPerPage = 8; // 페이지 당 게시글 수

  const iuser = props.match.params.iuser;
  const loginUserInfo = useContext(LoginInfo);
  const history = useHistory();

  useEffect(() => {
    if (nomarlOrCard === 0) {
       axios.post('/api/diary/paging', null, { params: { iuser: iuser, offsetNum: (8 * (currentPage - 1)) } })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [nomarlOrCard, currentPage]);

  useEffect(() => {
    if (nomarlOrCard === 0) {
      axios.post('/api/diary', null, { params: { iuser: iuser } })  // 작동 잘 되면 await 빼 보기
      .then((response) => {
        console.log(response.data);
        setAllDataLength(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [nomarlOrCard]);

  const handleWrite = () => {
    return new Promise(
      (resolve, reject) => {
        console.log('handlewirte 작동');
        axios.post('/api/preWrite', null, { params: {
          iuser: loginUserInfo.iuser,
          title: 'preWrite',
          content: 'preWrite',
        } })
        .then((response) => {
          resolve(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      }
    )
  }

  const renderingList = data.map((item, i) => 
    <DiaryCard 
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

  const paginate = (pageNumber) => { setCurrentPage(pageNumber); }

  return (
    <div className='diary'>
      <div className='diary-title-wrap'>
        <span>Diary</span>
        {loginUserInfo.iuser == iuser ? <img
          src={process.env.PUBLIC_URL + '/img/common/write_btn.svg'}
          onClick={() => { handleWrite().then(() => { history.push('/write') }) }}
        ></img> : <></>}
        <div className='diary-title-right'>
          <span className={nomarlOrCard === 0 ? 'btn-clicked' : 'btn-no-clicked'} onClick={() => { setNormalOrCard(0) }}>일반형</span>
          <span className={nomarlOrCard === 1 ? 'btn-clicked' : 'btn-no-clicked'} onClick={() => { setNormalOrCard(1) }}>카드형</span>
        </div>
      </div>
      { 
        nomarlOrCard === 0 
        ? <>
          <div className='diary-list'>
            {renderingList}
            <Pagination postsPerPage={postsPerPage} totalPosts={allDataLength} paginate={paginate} currentPage={currentPage} />
          </div>
          <div className='diary-profile'>
            <div 
              className='diary-profile-img'
              style={data[0] !== undefined ? { backgroundImage: `url(${process.env.PUBLIC_URL + data[0].profileimg})` } : {}}>
            </div>
            <div className='diary-profile-nickname'>{data[0] !== undefined ? data[0].nickname : ''}</div>
            <div className='diary-profile-introduction'>{data[0] !== undefined ? data[0].introduction : ''}</div>
          </div>
          </>
        : <CardList menu='diary' iuser={iuser} sort={null} />
      }
      <GoTopBtn />
    </div>
  );
}

export default Diary;