import React, { useContext } from 'react';
import './../../css/MyPage/MyPage.css';
import { LoginInfo } from './../../App';

const MyPage = () => {
    const loginUserInfo = useContext(LoginInfo);
    return (
        <div className="myPage-wrap">
            <div className="myPage-profile-area">
                프로필 영역
            </div>

            <div className="myPage-cate-area">
                카테고리 영역
            </div>

            <div className="myPage-views-area">
                뷰 영역
            </div>
        </div>
    );
}

export default MyPage;