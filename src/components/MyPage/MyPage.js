import React, { useContext, useRef, useState, useEffect } from 'react';
import './../../css/MyPage/MyPage.css';
import { LoginInfoContext } from '../../App';
import ProfileEdit from './ProfileEdit';
import DelUser from './DelUser';

const MyPage = () => {
    let loginUserInfo = useContext(LoginInfoContext);
    const [myPageView, setMyPageView] = useState(0);
    const cate = useRef();

    const cateArr = [
        {key: 0, value: '정보 수정'}, 
        {key: 1, value: 'sweet girl'}, 
        {key: 2, value: 'About. HEBE'}, 
        {key: 3, value: '회원 탈퇴'}
    ];

    const compoArr = [
        <ProfileEdit loginUserInfo={loginUserInfo} />,
        '조원 소개란',
        '프로젝트 소개란',
        <DelUser loginUserInfo={loginUserInfo} />
    ];

    const cateList = cateArr.map(tag => <div onClick={(e) => cateClick(tag.key, e)} key={tag.key}>{tag.value}</div>);
    
    const cateClick = (key, e) => {
        for(var i = 0; i < cate.current.children.length; i++) {
            cate.current.children[i].classList.remove('myPage-cate-clicked');
        }
        setMyPageView(key);
        e.target.classList.add('myPage-cate-clicked');
    }

    useEffect(() => {
        cate.current.children[0].classList.add('myPage-cate-clicked');
    }, [])
    
    return (
        <div className="myPage-wrap">
            <div className="myPage-profile-area">
                <div className="myPage-profile-img">
                    <img src={process.env.PUBLIC_URL + loginUserInfo.profileimg} alt='프로필 이미지'/>
                </div>
                <span className="myPage-profile-nickname">{loginUserInfo.nickname} 님 반갑습니다.</span>
            </div> 

            <div className="myPage-cate-area" ref={cate}>
                { cateList }
            </div> 

            <div className="myPage-views-area">
                { compoArr[myPageView] }
            </div>
        </div>
    );
}

export default MyPage;