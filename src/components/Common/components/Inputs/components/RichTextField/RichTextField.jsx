import React, { useState, useEffect } from 'react';
import { withFormsy } from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { RichText, DefaultText, TextField } from '../../../';
import * as Resources from '../../../../../../Resources';

const styles = {
  indications: {
    textTransform: 'none',
    '& .MuiInputBase-root': {
      display: 'none',
    },
  },
  bigLabel: {
    '& .MuiFormLabel-root': {
      fontSize: 22,
      fontWeight: 'bold',
      textTransform: 'none',
      color: '#555555',
    },
  },
};

const RichTextField = ({
  name,
  label,
  initial,
  readOnly,
  onChange,
  classes,
  noTool,
  bigLabel,
  editorClassName,
  allowTypeform,
}) => {
  const [showIndicationTools, setShowIndicationTools] = useState(false);
  const [value, setValue] = useState(initial);
  const textFieldRef = React.useRef();

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  // useEffect(() => {
  //     if(initial !== value) {
  //     }
  // }, [value]);

  const handleChange = (val) => {
    setValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div
      className={`${classes.indications} ${bigLabel ? classes.bigLabel : ''}`}
    >
      {!noTool && (
        <DefaultText lowercase style={{ position: 'relative' }}>
          <FontAwesomeIcon
            icon={showIndicationTools ? faChevronUp : faChevronDown}
            onClick={() => setShowIndicationTools(!showIndicationTools)}
            style={{
              position: 'absolute',
              left: bigLabel ? '105px' : '70px',
              top: bigLabel ? 4 : 0,
              cursor: 'pointer',
              zIndex: 50,
            }}
          />
        </DefaultText>
      )}
      <TextField
        lowercase
        ref={textFieldRef}
        name={name || 'indication'}
        initial={value || [{ children: [{ text: '' }] }]}
        readOnly={readOnly !== undefined ? readOnly : false}
        onChange={() => {}}
        label={label}
        fullWidth
        multiline
        rowsMax={10}
        style={noTool ? { display: 'none' } : {}}
      />
      <RichText
        name={name || 'indication'}
        initial={value || [{ children: [{ text: '' }] }]}
        readOnly={readOnly !== undefined ? readOnly : false}
        onChange={handleChange}
        label={label}
        displayTools={showIndicationTools}
        padding={'5px 0'}
        fullWidth
        multiline
        rowsMax={10}
        required
        editorClassName={editorClassName}
        allowTypeform
      />
    </div>
  );
};
export default withStyles(styles)(RichTextField);
