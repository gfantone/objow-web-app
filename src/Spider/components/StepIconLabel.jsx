import React from 'react';
import {StepLabel} from '@material-ui/core';

const StepIconLabel = ({children, icon}) => {
    return (
        <StepLabel icon={<div>{icon}</div>}>
            {children}
        </StepLabel>
    );
};

export default StepIconLabel;
