import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';

class HiddenInput extends Component {
  render() {
    const { name, value } = this.props;
    const errorMessage = !(!this.props.isFormSubmitted && value == null)
      ? this.props.errorMessage
      : null;
    const hasError = !(
      (!this.props.isFormSubmitted && value == null) ||
      this.props.isValid
    );

    return (
      <div style={{ margin: 0 }}>
        <input type="hidden" name={name} value={value} />
        {hasError && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default withFormsy(HiddenInput);
