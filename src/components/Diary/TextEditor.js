import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import createImagePlugin from '@draft-js-plugins/image';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

const imagePlugin = createImagePlugin();

const TextEditor = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const apiWrite = () => {
    console.log('apiWrite 작동');
    axios.post('/api/write', null, { params: {
      iuser: 1,
      title: title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      thumbnail: null
    } })
    .then((response) => {
      if (response.data === 1) {
        alert('작성 완료!');
      } else {
        alert('작성 실패');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
        // const data = new FormData();
        // data.append("storyImage", file)
        // axios.post(Upload file API call, data).then(responseImage => {
        //   resolve({ data: { link: PATH TO IMAGE ON SERVER } });
        // })
          
        // const fd = new FormData();
        // fd.append('image', file, file.name);
        // axios({
        //   method: 'post',
        //   url: '/api/write/img',
        //   data: fd,
        //   headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem("access_token") }
        // })
        // .then((response) => {
        //   console.log(response.data);
        // })

        // if (file) {
        //   let reader = new FileReader();
        //   reader.onload = (e) => {
        //       resolve({ data: { link: e.target.result } })
        //   };
        //   reader.readAsDataURL(file);
        // }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        let img = new Image();
        reader.onload = (e) => {
          img.src = this.result;
        }
      }
    );
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
          alt: { present: true, mandatory: true },
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
     }}
      />
      <div className="textEditor-footer">
        <span className="textEditor-footer-cancelBtn"><a href="#">취소</a></span>
        <span className="textEditor-footer-writeBtn" onClick={() => apiWrite()}>작성</span>
      </div>
    </div>
  )
}

export default TextEditor;