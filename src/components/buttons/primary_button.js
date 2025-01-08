import React from 'react';
import { Button, Flex } from 'antd';

const PrimaryButton = ({ title, color, variant, onClick }) => (

    <Button color= {color}  variant= {variant} onClick={onClick} >
      {title}
    </Button>
);

export default PrimaryButton;