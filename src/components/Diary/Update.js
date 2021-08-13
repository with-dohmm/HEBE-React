import React from 'react';
import UpdateEditor from './UpdateEditor';
import '../../css/Diary/Write.css';

const Update = (props) => {
  return (
    <div className="update-wrap">
      <div className="editor">
        <UpdateEditor iboard={props.match.params.iboard}/>
      </div>
    </div>
  )
}

export default Update;