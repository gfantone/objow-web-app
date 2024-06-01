import React, { useState } from 'react';
import { withFormsy } from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// import Visibility from '@mui/icons-material/Visibility';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '../';

const styles = {
  root: {
    width: 20,
    height: 20,
  },
};

const PasswordField = ({ classes, ...props }) => {
  const [type, setType] = useState('password');
  const toggleType = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const Icon = type === 'password' ? Visibility : VisibilityOff;
  return (
    <TextField
      {...props}
      type={type}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            className={classes.root}
            onClick={toggleType}
            tabindex="-1"
          >
            <Icon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default withStyles(styles)(PasswordField);
