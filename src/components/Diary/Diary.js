import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardList from '../Common/CardList';
import DiaryCard from './DiaryCard';
import GoTopBtn from '../Common/GoTopBtn';
import axios from 'axios';
import { LoginInfoContext } from './../../App';
import '../../css/Diary/Diary.css';
import Pagination from './Pagination';

const Diary = (props) => {
  const [nomarlOrCard, setNormalOrCard] = useState(0);
  
  const [data, setData] = useState([]);
  const [allDataLength, setAllDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);  // 최근 페이지 번호
	const postsPerPage = 8; // 페이지 당 게시글 수

  const [searchUser, setSearchUser] = useState({ profileimg: null, nickname: null, introduction: null });

  const iuser = props.match.params.iuser;
  const loginUserInfo = useContext(LoginInfoContext);
  const history = useHistory();

  // 페이징 번호, 좌우 버튼 클릭 시 데이터 가져오기
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
  }, [nomarlOrCard, currentPage, props.match.params.iuser]);

  // 해당 유저 전체 글 length + 유저 정보 가져오기
  useEffect(() => {
    // length 가져오기
    axios.post('/api/diary', null, { params: { iuser: iuser } })
    .then((response) => {
      console.log(response.data);
      setAllDataLength(response.data.length);
    })
    .catch((error) => {
      console.log(error);
    });
    
    if (nomarlOrCard === 0) {
      // 유저 정보 가져오기
      axios.post('/api/diary/userInfo', null, { params: { iuser: iuser } })
      .then((response) => {
        setSearchUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [nomarlOrCard, props.match.params.iuser]);

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
      {/* 소제목 부분 */}
      <div className='diary-title-wrap'>
        <span>Diary</span>
        {loginUserInfo.iuser == iuser ? <img 
          src={process.env.PUBLIC_URL + '/img/common/write_btn.svg'}  // 현재 로그인한 유저와 현재 페이지의 유저 정보가 같을 경우 작성 버튼 표시
          onClick={() => { history.push('/write') }}
        ></img> : <></>}
        <div className='diary-title-right'>
          <span className={nomarlOrCard === 0 ? 'btn-clicked' : 'btn-no-clicked'} onClick={() => { setNormalOrCard(0) }}>일반형</span>
          <span className={nomarlOrCard === 1 ? 'btn-clicked' : 'btn-no-clicked'} onClick={() => { setNormalOrCard(1) }}>카드형</span>
        </div>
      </div>

      {/* 다이어리 리스트 부분 */}
      { 
        nomarlOrCard === 0    // 일반형
        ? <>
          <div className='diary-list'>
            {
              allDataLength !== 0   // 게시글이 없을 경우 noPost.png 사진 표시
              ? renderingList 
              : <div className='no-post'>
                <img src={process.env.PUBLIC_URL + '/img/common/noPost.png'} />
                <span onClick={() => { history.push('/write') }}>첫 글 쓰러가기</span>
              </div>
            }
            {allDataLength !== 0 ? <Pagination postsPerPage={postsPerPage} totalPosts={allDataLength} paginate={paginate} currentPage={currentPage} /> : <></>}
          </div>
          <div className='diary-profile'>
            <div 
              className='diary-profile-img'
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL + searchUser.profileimg})` }}>
            </div>
            <div className='diary-profile-nickname'>{searchUser.nickname}</div>
            <div className='diary-profile-introduction'>{searchUser.introduction}</div>
          </div>
          </>
        : <>
            { // 카드형
              allDataLength !== 0 
              ? <CardList menu='diary' iuser={iuser} sort={null} />
              : <div className='no-post'>
                  <img src={process.env.PUBLIC_URL + '/img/common/noPost.png'} />
                  <span onClick={() => { history.push('/write') }}>첫 글 쓰러가기</span>
                </div>
            }
          </>
      }
      <GoTopBtn />
    </div>
  );
}

export default Diary;