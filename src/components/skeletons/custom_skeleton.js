import React from 'react';
import { Skeleton } from 'antd';

const CustomSkeleton = ({ height, width }) => (
  <Skeleton active style={{ height, width }} />
);

export default CustomSkeleton;
