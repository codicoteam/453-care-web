import React from 'react';
import { Result } from 'antd';

const CustomErrorResult = ({ title, subTitle, status, width, height }) => (
    <Result
    style={{ width, height }}
      status={status}
      title={title}
      subTitle={subTitle}
    />
);

export default CustomErrorResult;
