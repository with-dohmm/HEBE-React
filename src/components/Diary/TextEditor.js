import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import createImagePlugin from '@draft-js-plugins/image';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { LoginInfoContext } from './../../App';

const imagePlugin = createImagePlugin();

const TextEditor = () => {
  const [title, setTitle] = useState('');   // title input onChange 담아두는 용도
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const iboard = useRef(0);
  const imgSrc = useRef("");
  const thumbnailSrc = useRef(null);
  const loginUserInfo = useContext(LoginInfoContext);
  const history = useHistory();

  const finish = useRef(0);

  // 최신 iboard 값 가져오기 -> +1 한 값을 iboard 변수에 담아줌
  // 로그인한 유저 iuser와 iboard 변수 조합으로 폴더 경로 생성
  useEffect(() => {
    axios.post('/api/diary/recent')
    .then((response) => {
      console.log('most recent iboard : ' + response.data);
      iboard.current = parseInt(response.data) + 1; // 기존에는 +1 없음
    })
    .catch((error) => {
      console.log(error);
    })

    return () => {
      console.log('useEffect didwillunmount');
      if (finish.current === 0) {
        apiCancel();
      }
    }
  }, []);

  // 글쓰기 작성 완료
  const apiWrite = () => {
    console.log('apiWrite 작동');
    console.log(iboard);

    const draftHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let firstIndex = draftHtml.indexOf('src="') + 5;
    let lastIndex = draftHtml.indexOf('"', firstIndex);
    thumbnailSrc.current = draftHtml.substring(firstIndex, lastIndex);

    console.log(thumbnailSrc.current);

    if (title !== '' && draftHtml.length >= 8) {
      axios.post('/api/write', null, { params: {
        iuser: loginUserInfo.iuser,
        iboard: iboard.current,
        title: title,
        content: draftHtml,
        thumbnail: (thumbnailSrc.current.includes('/img/') ? thumbnailSrc.current : '/img/common/no_thumbnail.jpg')
      } })
      .then((response) => {
        if (response.data === 1) { 
          alert('작성 완료');
          finish.current = 1;
        } else { 
          alert('작성 실패'); 
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        history.push('/diary/' + loginUserInfo.iuser);
      });
    } else {
      alert('내용을 입력해주세요.');
    }
  }

  // 이미지 업로드
  const uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
        if (file) {
          const data = new FormData();
          data.append('img', file);
          data.append('iboard', iboard.current);
          data.append('iuser', loginUserInfo.iuser);

          axios({
            method: 'post',
            url: '/api/diaryImg',
            data: data,
            header: { 'ContentType': 'multipart/form-data' }
          })
          .then((response) => {
            console.log('file name : ' + response.data);
            imgSrc.current = process.env.PUBLIC_URL + '/img/' + loginUserInfo.iuser + '/' + iboard.current + '/' + response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            let reader = new FileReader();
            reader.onload = (e) => {
              resolve({ data: { link: imgSrc.current } })
            };
            reader.readAsDataURL(file);
          })
          .then(() => {
            console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())) + 1);
          })
        } else {
          reject(new Error("file no exist"))
        }
      } 
    );
  }

  // 작성 취소
  const apiCancel = () => {
    axios.post('/api/cancel', null, { params: {
      iboard: iboard.current,
      iuser: loginUserInfo.iuser
    } })
    .then((response) => {
      if (response.data === 1) {
        console.log('작성 취소 성공');   // 이제는 preWrite를 쓰지 않고 있으므로 DB에 데이터를 지울 필요가 없음
      } else {                          // 대신 이미지를 업로드 했다가 작성 취소를 할 경우 버킷에 이미지가 남으므로 지워줘야 함
        console.log('실패')
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      history.push('/diary/' + loginUserInfo.iuser);
    })
  }


  return (
    <div id="textEditor">
      <input className="editor-title" type="text" placeholder="제목" onChange={(e) => setTitle(e.target.value)}></input>
      <Editor
        editorState={editorState}
        plugins={[imagePlugin]}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
          uploadEnabled: true,
          uploadCallback: uploadCallback,
          previewImage: true,
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
     }}
      />
      <div className="textEditor-footer">
        <span className="textEditor-footer-cancelBtn" onClick={() => apiCancel()}>취소</span>
        <span className="textEditor-footer-writeBtn" onClick={() => apiWrite()}>작성</span>
      </div>
    </div>
  )
}

export default TextEditor;