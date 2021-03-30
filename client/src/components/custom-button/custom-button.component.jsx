import React from 'react';
import './custom-button.styles.scss';
import { CustomButtonContainer } from './custom-button.styles'; 

const CustomButton = ({ children, ...props }) => (
    <button className="custom-button" {...props}>
        {children}
    </button>
);

export default CustomButton;