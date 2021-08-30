import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import createImagePlugin from '@draft-js-plugins/image';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { LoginInfoContext } from './../../App';

const imagePlugin = createImagePlugin();

const UpdateEditor = (props) => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState({});
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const iboard = props.iboard;
  const imgSrc = useRef("");
  const thumbnailSrc = useRef(null);
  const loginUserInfo = useContext(LoginInfoContext);
  const history = useHistory();

  // 업데이트 전 기존 데이터 불러오기
  useEffect(() => {
    axios.post('/api/detail', null, { params: {
      iboard: parseInt(iboard),
      iuser: loginUserInfo.iuser
    } })
    .then((response) => {
      setData(response.data);
      const blocksFromHtml = htmlToDraft(response.data.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
      setTitle(response.data.title);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // 글쓰기 수정 완료
  const apiWrite = () => {
    console.log('apiWrite 작동');
    console.log(iboard);

    const draftHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let firstIndex = draftHtml.indexOf('src="') + 5;
    let lastIndex = draftHtml.indexOf('"', firstIndex);
    thumbnailSrc.current = draftHtml.substring(firstIndex, lastIndex);

    axios.post('/api/write', null, { params: {
      iuser: loginUserInfo.iuser,
      iboard: iboard,
      title: title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      thumbnail: (thumbnailSrc.current !== null ? thumbnailSrc.current : process.env.PUBLIC_URL + '/img/cat_profile.jpg')
    } })
    .then((response) => {
      if (response.data === 1) {
        alert('수정 완료!');
        history.push('/diary/' + loginUserInfo.iuser);  // 수정 필수
      } else {
        alert('수정 실패');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // 이미지 업로드
  const uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
        if (file) {
          const data = new FormData();
          data.append('img', file);
          data.append('iboard', iboard);
          data.append('iuser', loginUserInfo.iuser);

          axios({
            method: 'post',
            url: '/api/diaryImg',
            data: data,
            header: { 'ContentType': 'multipart/form-data' }
          })
          .then((response) => {
            console.log('file name : ' + response.data);
            imgSrc.current = process.env.PUBLIC_URL + '/img/' + loginUserInfo.iuser + '/' + iboard + '/' + response.data;
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

  return (
    <div id="textEditor">
      <input className="editor-title" 
             type="text" 
             placeholder="제목" 
             value={title}
             onChange={(e) => setTitle(e.target.value)}>
      </input>
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
        <span className="textEditor-footer-cancelBtn" onClick={() => { history.push('/detail/:iboard') }}>취소</span>
        <span className="textEditor-footer-writeBtn" onClick={() => apiWrite()}>작성</span>
      </div>
    </div>
  )
}

export default UpdateEditor;