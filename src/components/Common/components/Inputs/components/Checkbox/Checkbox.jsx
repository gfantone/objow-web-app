import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

class CustomCheckbox extends Component {
  handleChange = (event) => {
    this.props.setValue(event.target.checked);
  };
  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name={this.props.name}
            checked={this.props.value || false}
            style={{ color: '#00E58D' }}
            onChange={this.handleChange}
          />
        }
        label={this.props.label}
      />
    );
  }
}

export default withFormsy(CustomCheckbox);
