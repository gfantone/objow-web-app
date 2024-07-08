import React from 'react';
import { withFormsy } from 'formsy-react';

const errorStyle = {
  color: '#f44336',
};

const FileInput = ({ accept = null, multiple, name, onChange, ...props }) => {
  const hasError = props.isFormSubmitted && !props.isValid;
  const style = hasError ? errorStyle : null;

  const handleChange = (event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      if (!multiple) {
        const file = files[0];
        props.setValue(file);
        if (onChange) {
          onChange(file);
        }
      } else {
        props.setValue(files);
        if (onChange) {
          onChange(files);
        }
      }
    }
  };

  return (
    <div>
      <input
        accept={accept}
        type='file'
        name={name}
        multiple={multiple}
        onChange={handleChange}
        style={style}
      />
    </div>
  );
};

export default withFormsy(FileInput);
