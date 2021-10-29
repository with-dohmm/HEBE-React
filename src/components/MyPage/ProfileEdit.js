import React, { useState, useRef } from 'react';
import './../../css/MyPage/ProfileEdit.css';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const ProfileEdit = ({loginUserInfo}) => {
    const profileImgUp = useRef();
    const [profileImgPre, setProfileImgPre] = useState(loginUserInfo.profileimg);
    const [userInfoMod, setUserInfoMod] = useState({nickname: loginUserInfo.nickname, introduction: loginUserInfo.introduction});
    const options = {maxSizeMB: 0.5, useWebWorker: true}

    {/* 프로필 이미지 미리보기 */}
    const onProfileUp = (e) => {
        const { target : {files}, } = e;
        const theFile = files[0];
        imageCompression(theFile, options)
        .then((compressedFile) => {
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = (finishedEvent) =>{
                const {currentTarget : { result }} = finishedEvent;
                setProfileImgPre(result);
            };
        })
        .catch((e) => { console.log(e); });
    };

    {/* 이미지 변환 */}
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

    {/* 프로필 수정 */}
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
            loginUserInfo = { ...loginUserInfo, 
                introduction: res.data.introduction, nickname: res.data.nickname };
            if(res.data.profileimg !== null) {
                loginUserInfo = { ...loginUserInfo, profileimg: res.data.profileimg };
            }
            window.localStorage.setItem('loginUser', JSON.stringify(loginUserInfo));
            window.location.reload();
        })
        .catch((e) => { console.log(e); });
    };
    
    return (
        <>
            <div className="myPage-view-profile">
                <div className="myPage-view-profile-img">
                    <img src={process.env.PUBLIC_URL + profileImgPre} alt='프로필 이미지'/>
                </div>
                <input type="file" accept="image/*" ref={ profileImgUp } onChange={ onProfileUp }></input>
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
        </>
    )
}

export default ProfileEdit;