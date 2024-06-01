import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

class CustomCheckbox extends Component {
  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name={this.props.name}
            checked={this.props.value}
            style={{ color: '#00E58D' }}
            onChange={this.props.onChange}
          />
        }
        label={this.props.label}
      />
    );
  }
}

export default withFormsy(CustomCheckbox);
