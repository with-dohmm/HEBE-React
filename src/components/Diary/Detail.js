import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = (props) => {
  const iboard = props.match.params.iboard;
  const [data, setData] = useState({});

  useEffect(() => {
    axios.post('/api/detail', null, { params: {
      iboard: iboard
    } })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div>
      <div>title : <span dangerouslySetInnerHTML={ {__html: data.title} }></span></div>
      <div>content : <div dangerouslySetInnerHTML={ {__html: data.content} }></div></div>
    </div>
  );
}

export default Detail; 