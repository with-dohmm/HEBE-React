import React, { useState, useEffect } from 'react';
import Item from './Item';
import apiAxios from '../Common/apiAxios';

const Frame = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [id, setId] = useState(0);

  const getList = (data) => {
    setList(data);
  } 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const insItem = () => {
    const newList = list.concat({id: id, todo: inputValue, check: false});
    setList(newList);
    setId(id+1);
    setInputValue('');

    console.log(list)
  }

  const renderingList = list.map((item) => 
    <Item 
      key={item.id}
      id={item.id}
      todo={item.todo}
      check={item.check}
    />
  )

  useEffect(() => {
    apiAxios('/todo', getList);
  }, []);

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleChange} placeholder="Input To Do" />
        <button onClick={insItem}>Ins</button>
      </div>
      <div>
        {renderingList}
      </div>
    </div>
  );
}

export default Frame;