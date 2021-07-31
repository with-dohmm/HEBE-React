import React, { useState, useEffect } from 'react';
import TextEditor from './TextEditor';
import '../../css/Diary/Write.css';

const Write = () => {
  
  return (
    <div>
      <div className="editor">
        <TextEditor />
      </div>
    </div>
  )
}

export default Write;