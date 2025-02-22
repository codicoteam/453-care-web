import React from 'react';
import { Image } from 'antd';

const NotFoundImage = ({ text, height, width }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height, width }}>
      <Image
        width={width}
        height={height}
        src="error"
        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoy..."
      />
      <p style={{ marginTop: '10px', textAlign: 'center' }}>{text}</p>
    </div>
  );
};

export default NotFoundImage;