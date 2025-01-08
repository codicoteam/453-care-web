import React from 'react';
import { Empty } from 'antd';

const CustomNoData = ({ width, height }) => (
  <div style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Empty />
  </div>
);

export default CustomNoData;
