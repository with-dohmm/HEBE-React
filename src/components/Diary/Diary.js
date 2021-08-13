import React, { useContext } from 'react';
import CardList from '../Common/CardList';
import GoTopBtn from '../Common/GoTopBtn';
import axios from 'axios';
import { LoginInfo } from './../../App';
import '../../css/Diary/Diary.css';

const Diary = (props) => {
  const iuser = props.match.params.iuser;
  const loginUserInfo = useContext(LoginInfo);

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

  return (
    <div className='diary'>
      <div className='diary-title-wrap'>
        <span>Diary</span>
        {loginUserInfo.iuser == iuser ? <img
          src={process.env.PUBLIC_URL + '/img/common/write_btn.svg'}
          onClick={() => { handleWrite().then((res) => {  }) }}
        ></img> : <></>}
      </div>
      <CardList menu='diary' iuser={iuser} sort={null} />
      <GoTopBtn />
    </div>
  );
}

export default Diary;