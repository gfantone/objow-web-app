import React from 'react';
import { TextField } from '@material-ui/core';
import {withFormsy} from "formsy-react";

const CustomTextField = ({...props}) => {
    const hasError = !props.isPristine && !props.isValid;
    const helperText = hasError ? props.errorMessage : props.helperText
    return (
        <TextField
            {...props}
            error={hasError}
            helperText={helperText}
        />
    );
};

export default withFormsy(CustomTextField);
