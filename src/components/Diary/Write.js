import React from 'react';
import TextEditor from './TextEditor';
import '../../css/Diary/Write.css';

const Write = () => {
  
  return (
    <div className="write-wrap">
      <div className="editor">
        <TextEditor />
      </div>
    </div>
  )
}

export default Write;