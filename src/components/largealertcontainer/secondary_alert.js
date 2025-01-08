import React from 'react';
import { Alert } from 'antd';
import { Button,} from 'antd';

const SecondaryAlertContainer = ({message , description}) => (
  <>
   
    <Alert
      message= {message}
      description= {description}
      type="info"
      showIcon
      
    />
    
   
  </>
);
export default SecondaryAlertContainer;