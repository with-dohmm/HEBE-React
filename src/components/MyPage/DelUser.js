import React from 'react'

const DelUser = ({loginUserInfo}) => {
    return (
        <div className="myPage-view-delUser">
            <div className="myPage-view-delUser-info">
                <h2>회원탈퇴 후 회원정보 및 모든 데이터는 삭제됩니다.</h2>
                <p>
                    회원정보 및 다이어리, 투두, 좋아요 등 데이터는 모두 삭제되며, 
                    <br/>
                    삭제된 데이터는 복구되지 않습니다.
                    <br/>
                    필요한 데이터는 미리 백업해 주세요.
                </p>
                <h2>비밀번호 확인</h2>
                <p>
                    회원님의 소중한 정보 보호를 위해 비밀번호 확인이 필요합니다.
                    <br/>
                    회원탈퇴가 완료되면 HEBE 메인 페이지로 이동합니다.
                </p>
            </div>

            <div className="myPage-view-delUser-check">
                <div className="myPage-view-delUser-check-left">
                    <div>아이디</div>
                    <div>비밀번호</div>
                </div>
                <div className="myPage-view-delUser-check-right">
                    <span>{loginUserInfo.username}</span>
                    <input type="text"/>
                </div>
            </div>

            <div className="myPage-view-delUser-button">
                회원탈퇴
            </div>
        </div>
    )
}

export default DelUser;