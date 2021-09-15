import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/Diary/Detail.css';
import { LoginInfoContext } from './../../App';

const Detail = (props) => {
  const iboard = props.match.params.iboard;
  const [data, setData] = useState({ iuser: null });
  const [cmtData, setCmtData] = useState([]);
  const [comment, setComment] = useState('');
  const [cmtToggle, setCmtToggle] = useState(0);
  const [isFav, setIsFav] = useState(0);
  
  const loginUserInfo = useContext(LoginInfoContext);
  
  const history = useHistory();

  const cmtTextarea = useRef();

  // 댓글 리스트 불러오기
  const apiCmtList = () => {
    axios.post('/api/cmt/list', null, { params: {
      iboard: iboard
    } })
    .then((response) => {
      setCmtData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  // 글 데이터 불러오기
  useEffect(() => {
    return new Promise((resolve, reject) => {
      // 글 데이터
      axios.post('/api/detail', null, { params: {
        iboard: iboard,
        iuser: loginUserInfo.iuser
      } })
      .then((response) => {
        setData(response.data);
        setIsFav(response.data.isFav);
        resolve('/api/detail done')
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .then(() => {
      apiCmtList();
    });
  }, []);
  
  // 글 삭제
  const apiDelete = () => {
    axios.post('/api/delete', null, { params: {
      iboard: iboard,
      iuser: loginUserInfo.iuser
    } })
    .then((response) => {
      console.log('결과 : ' + response);  // 1: 성공 0: 실패
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      history.push('/diary/' + loginUserInfo.iuser);
    })
  }

  // 내가 작성한 글일 경우 수정,삭제 버튼 활성화 (글 수정은 /update로 요청)
  const buttons = ( 
    data.iuser === loginUserInfo.iuser
    ? <>
        <span className="update-delete-btn">
          <Link to={'/update/' + iboard}>수정</Link>
        </span>
        <span className="update-delete-btn" onClick={ apiDelete }>삭제</span>
      </> 
    : <></>
  );

  // 댓글 작성
  const apiCmtWrite = () => {
    return new Promise((resolve, reject) => {
      axios.post('/api/cmt/write', null, { params: {
        iboard: iboard,
        iuser: loginUserInfo.iuser,
        comment: comment
      } })
      .then((response) => {
        console.log(response); // 1: 성공 0: 실패
        cmtTextarea.current.value = '';
        resolve('/api/cmt/write done');
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .then((resolveData) => {
      apiCmtList();
    });
  }

  // 댓글 삭제
  const apiCmtDelete = (icmt) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/cmt/delete', null, { params: {
        icmt: icmt,
        iuser: loginUserInfo.iuser
      } })
      .then((response) => {
        console.log(response); // 1: 성공 0: 실패
        resolve('/api/cmt/delete done');
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .then((resolveData) => {
      apiCmtList();
    });
  }

  // 댓글 수정
  const apiCmtUpdate = (icmt) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/cmt/update', null, { params: {
        icmt: icmt,
        iuser: loginUserInfo.iuser,
        comment: comment
      } })
      .then((response) => {
        console.log(response);
        resolve('/api/cmt/update done');
        setCmtToggle(0);
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .then((resolveData) => {
      apiCmtList();
    });
  }

  // 댓글 리스트
  const cmtList = cmtData.map((cmt, index) => 
    <div key={index} className={`cmt-item cmt-${cmt.iboard}-${cmt.icmt}`}>
      <div className="cmt-item-top">
        <img src={process.env.PUBLIC_URL + cmt.profileimg}></img>
        <div className="cmt-item-top-profile">
          <div>{cmt.nickname}</div>
          <div>{cmt.regdt}</div>
          <span className={(cmt.iuser === loginUserInfo.iuser ? 'cmt-controllbox' : 'hidden')}>
            <span onClick={() => { setCmtToggle((cmtToggle === 0 ? cmt.icmt : 0)) }}>수정</span>
            <span onClick={() => { apiCmtDelete(cmt.icmt) }}>삭제</span>
          </span>
        </div>
      </div>
      <div className="cmt-item-bottom">
        {(cmtToggle === cmt.icmt
          ? <div className="cmt-updatebox">
              <textarea name="comment" onChange={(e) => setComment(e.target.value)}></textarea>
              <span onClick={() => { apiCmtUpdate(cmt.icmt) }}>완료</span>
            </div>  
          : cmt.comment
        )}
        </div> 
    </div>
  )

  // 좋아요
  const apiFav = (e) => {
    axios.post('/api/fav', null, { params: {
      iuser: loginUserInfo.iuser,
      iboard: iboard
    } })
    .then((response) => {
      setIsFav(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const colorGray = { color: "gray" }
  const colorRed = { color: "red" }
  
  const regdtSpan = { marginRight: 0 }

  return (
    <div className="detail" >
      <div className="detail-title" dangerouslySetInnerHTML={ {__html: data.title} }></div>
      <div className="detail-title-btn">
        <span style={loginUserInfo.isLogin !== true ? regdtSpan : {}}>{data.regdt}</span>
        {buttons}
        {loginUserInfo.isLogin === true ?
         <span className="top-heart-btn" onClick={apiFav} style={isFav === 1 ? colorRed : colorGray}>♥</span>
        : <></>}
      </div>
      <div className="detail-content" dangerouslySetInnerHTML={ {__html: data.content} }></div>
      <div className="detail-profile">
        <img src={process.env.PUBLIC_URL + data.profileimg}></img>
        <div className="detail-profile-introduce">
          <div>{data.nickname}</div>
          <div>{data.introduction}</div>
        </div>
      </div>
      <div className="detail-reply-top">
        <div className="detail-reply-text">댓글</div>
        {loginUserInfo.isLogin === true ? 
        <div 
          onClick={apiFav}
          className="detail-reply-heart"
          style={isFav === 1 ? colorRed : colorGray}>♥</div>
         : <></>}
      </div>
      <div className="detail-reply">
        {loginUserInfo.isLogin === true ? 
        <>
          <textarea name="comment" ref={cmtTextarea} onChange={(e) => setComment(e.target.value)}></textarea>
          <div className="detail-reply-btn" onClick={ apiCmtWrite }>댓글 작성</div>
        </>
        : <></>}
        <div className="detail-reply-list">
          {cmtList}
        </div>
      </div>
    </div>
  );
}

export default Detail;