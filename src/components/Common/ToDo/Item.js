import React, { useState, useEffect } from 'react';

const Item = (props) => {
  const [id, setId] = useState(props.id);
  const [todo, setTodo] = useState(props.todo);
  const [check, setCheck] = useState(props.check);

  return (
    <div>
      <span>{todo}</span>
      <span>{(check === true ? 'v' : '')}</span>
    </div>
  );
}

export default Item; 