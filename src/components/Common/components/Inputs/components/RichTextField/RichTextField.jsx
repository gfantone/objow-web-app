import React, {useState, useEffect} from 'react'
import {withFormsy} from 'formsy-react'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { RichText, DefaultText, TextField } from '../../../'
import * as Resources from '../../../../../../Resources'

const styles = {
  indications: {
    '& .MuiInputBase-root': {
      display: 'none'
    }
  }
}

const RichTextField = ({ name, label, initial, readOnly, onChange, classes }) => {
  const [showIndicationTools, setShowIndicationTools] = useState(false)
  const [value, setValue] = useState(initial)
  const textFieldRef = React.useRef()

  useEffect(() => {
      setValue(initial)
  }, [initial]);

  // useEffect(() => {
  //     if(initial !== value) {
  //     }
  // }, [value]);

  const handleChange = (val) => {
      setValue(val);
      if (onChange) onChange(val)
  };

  return (
    <div className={ classes.indications }>
      <DefaultText style={{ position: 'relative' }}>
        <FontAwesomeIcon
          icon={ showIndicationTools ? faChevronUp : faChevronDown }
          onClick={() => setShowIndicationTools(!showIndicationTools)}
          style={{ position: "absolute", left: '70px', cursor: 'pointer', zIndex: 50 }}
        />
      </DefaultText>
      <TextField
        ref={textFieldRef}
        name={ name || 'indication' }
        initial={ value || [ { children: [{ text: '' }],}] }
        readOnly={ readOnly !== undefined ? readOnly : false }
        onChange={() => {}}
        label={ label }
        fullWidth
        multiline
        rowsMax={10}
      />
      <RichText
        name={ name || 'indication' }
        initial={ value || [ { children: [{ text: '' }],}] }
        readOnly={ readOnly !== undefined ? readOnly : false }
        onChange={ handleChange }
        label={ label }
        displayTools={ showIndicationTools }
        padding={'5px 0'}
        fullWidth
        multiline
        rowsMax={10}
        required
      />
  </div>
  )
}
export default withStyles(styles)(RichTextField)
