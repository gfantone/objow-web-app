import React from 'react'
import { withFormsy } from 'formsy-react'

const FileInput = ({ accept = null, multiple, name, ...props }) => {
    const handleChange = (event) => {
        const files = event.currentTarget.files;
        if (files && files.length > 0) {
            if (!multiple) {
                const file = files[0];
                props.setValue(file)
            } else {
                props.setValue(files)
            }
        }
    };

    return (
        <div>
            <input
                accept={accept}
                type="file"
                name={name}
                multiple={multiple}
                onChange={handleChange}
            />
        </div>
    )
};

export default withFormsy(FileInput)