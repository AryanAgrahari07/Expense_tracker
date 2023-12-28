import React from 'react';
import {Spin} from "antd";

const Spinner = () => {
  return (
    <div className='spinner'>
      <Spin color= 'gray' style={{color: 'gray'}} size='large'/>
    </div>
  )
}

export default Spinner;
