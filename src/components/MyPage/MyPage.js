import React, { useState, useContext, useRef } from 'react';
import './../../css/MyPage/MyPage.css';
import { LoginInfoContext } from '../../App';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const MyPage = () => {
    const profileImgUp = useRef();
    let loginUserInfo = useContext(LoginInfoContext);
    const [profileImgPre, setProfileImgPre] = useState(loginUserInfo.profileimg);
    const [userInfoMod, setUserInfoMod] = useState({nickname: loginUserInfo.nickname, introduction: loginUserInfo.introduction});
    const options = {maxSizeMB: 0.5, useWebWorker: true}

    // 프로필 파일 미리보기
    const onProfileUp = (e) => {
        const { target : {files}, } = e;
        const theFile = files[0];

        imageCompression(theFile, options)
        .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget : { result }} = finishedEvent;
            setProfileImgPre(result);
        };
        
        })
        .catch(function (error) {
        console.log(error.message);
        });
    };

    // base64 to image file
    const onDataForm = () => {
        const byteString = atob(profileImgPre.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
            type: 'image/jpeg'
        });
        const file = new File([blob], 'image.jpg');
        return file;
    };

    const onUserInfoMod = () => {
        const formData = new FormData();
        
        if(profileImgPre.length > 100) {
            formData.append('profileimg', onDataForm());
        }

        formData.append('nickname', userInfoMod.nickname);
        formData.append('introduction', userInfoMod.introduction);
        formData.append('iuser', loginUserInfo.iuser);

        axios.post('/api/user/profileMod', formData, { 
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {      
            loginUserInfo = { ...loginUserInfo, introduction: res.data.introduction, nickname: res.data.nickname };
            
            if(res.data.profileimg !== null) {
                loginUserInfo = { ...loginUserInfo, profileimg: res.data.profileimg };
            }

            window.localStorage.setItem('loginUser', JSON.stringify(loginUserInfo));
            window.location.reload();
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div className="myPage-wrap">
            <div className="myPage-profile-area">
                <div className="myPage-profile-img">
                    <img src={process.env.PUBLIC_URL + loginUserInfo.profileimg} alt='프로필 이미지'/>
                </div>
                <span className="myPage-profile-nickname">{loginUserInfo.nickname} 님 반갑습니다.</span>
            </div> 

            <div className="myPage-cate-area">
                <div className="myPage-cate-clicked">정보 수정</div>
                <span></span>
                <div>sweet girl</div>
                <span></span>
                <div>About. HEBE</div>
                <span></span>
                <div>회원 탈퇴</div>
            </div> 

            <div className="myPage-views-area">
                <div className="myPage-view-profile-area">
                    <div className="myPage-view-profile">
                        <div className="myPage-view-profile-img">
                            <img src={process.env.PUBLIC_URL + profileImgPre} alt='프로필 이미지'/>
                        </div>
                        <input type="file" accept="image/*"
                        ref={ profileImgUp } onChange={ onProfileUp }></input>
                        <img className="myPage-view-profile-camera" onClick={ e => profileImgUp.current.click() }
                        src={process.env.PUBLIC_URL + '/img/common/camera.png'} alt='프로필 이미지'></img>
                    </div>

                    <div className="myPage-view-profile-userInfo">
                        <span>닉네임</span>
                        <input onChange={e => setUserInfoMod({...userInfoMod, nickname: e.target.value})} value={userInfoMod.nickname}></input>
                        <span>한 줄 소개</span>
                        <input onChange={e => setUserInfoMod({...userInfoMod, introduction: e.target.value})} value={userInfoMod.introduction}></input>
                    </div>
                    <div onClick={ onUserInfoMod } className="myPage-view-profile-userInfo-button">
                        정보 수정
                    </div>
                </div>
                <div className="hidden">
                    sweet girl
                </div>
                <div className="hidden">
                    about hebe
                </div>
                <div className="hidden">
                    회원 탈퇴
                </div>
            </div>
        </div>
    );
}

export default MyPage;