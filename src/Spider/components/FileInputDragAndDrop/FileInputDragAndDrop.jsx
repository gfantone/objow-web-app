import {FileUploader} from "react-drag-drop-files";
import React, {useState} from "react";
import Button from "../Button";
import {DocumentUpload, Document as DocumentIcon} from "iconsax-react";
import {withStyles} from "@mui/styles";
import {useIntl} from "react-intl";

const styles = {
    customFileInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: 'dashed 2px',
        borderColor: '#0041ac',
        borderRadius: '1rem',
        padding: '3rem',
        textAlign: 'center',
        cursor: 'pointer',
        '&:focus-within': {
            outline: 'none !important'
        },
    },
    customFileInputSuccess: {
      backgroundColor: '#D1FADF',
      borderColor: '#025A35 !important',
    },
    dropZoneSuccess: {
      color: '#025A35 !important'
    },
    customFileInputError: {
      backgroundColor: '#FFEEED',
      borderColor: '#BD0D00 !important',
    },
    dropZoneError: {
        color: '#BD0D00 !important'
    },
    customFileInputIcon: {
        color: '#0041ac',
        marginBottom: '1rem'
    },
    customFileInputLabel: {
        fontWeight: 600,
        color: '#0041ac',
        marginBottom: '0.5rem'
    },
    customFileInputFileType: {
        marginBottom: '1rem'
    }
};

const FileInputDragAndDrop = ({fileOrFilesChanged, multiple = false, authorizedFileTypes = ["JPG", "PNG"], maxSize = 2, minSize = 0, ...props}) => {
    const intl = useIntl();
    const [fileOrFiles, setFileOrFiles] = useState(multiple ? [] : null);
    const [error, setError] = useState(null)
    const usableFileType = authorizedFileTypes

    const usableFileTypeStringify = usableFileType
        .map((fileType) => `.${fileType.toLowerCase()}`)
        .join(', ')

    const handleChange = (fileOrFilesItem) => {
        setError(null)
        const newFileOrFiles = multiple ? [...fileOrFilesItem] : [fileOrFilesItem]
        fileOrFilesChanged(newFileOrFiles)
        setFileOrFiles((previousFiles) => {
            return multiple ? [...previousFiles, ...newFileOrFiles] : newFileOrFiles
        })
    };

    const handleErrorType = (error) => {
        setFileOrFiles([])
        fileOrFilesChanged(null)
        setError(error)
    }

    const handleSizeError = (sizeError) => {
        setFileOrFiles([])
        fileOrFilesChanged(null)
        setError(sizeError)
    }

    const getCustomDropZoneArea = () => {
        return (
            <div>
                <div className={`${props.classes.customFileInputIcon} ${error ? props.classes.dropZoneError : (fileOrFiles && fileOrFiles.length > 0 ? props.classes.dropZoneSuccess : '')}`}>
                    { (fileOrFiles && fileOrFiles.length > 0) ? <DocumentUpload/> : <DocumentIcon/> }
                </div>

                {!error && (!fileOrFiles || fileOrFiles.length === 0) &&
                    <div className={props.classes.customFileInputLabel}>
                        {intl.formatMessage({id: 'spider.systemFile.fileUpload.dragAndDropLabel'})}
                    </div>
                }

                {(fileOrFiles && fileOrFiles.length > 0) &&
                    <div style={{ color: '#025A35', fontStyle: 'italic' }}>
                        {fileOrFiles.map((file) => file.name).join(', ')}
                    </div>
                }

                {(fileOrFiles && fileOrFiles.length > 0) &&
                    <div style={{ color: '#025A35', fontWeight: 'bold' }}>
                        {intl.formatMessage({id: 'spider.systemFile.fileUpload.documentImportedSuccess'})}
                    </div>
                }

                {error &&
                    <div style={{ color: '#BD0D00', fontWeight: 'bold' }}>
                        {error}
                    </div>
                }

                <div className={props.classes.customFileInputFileType}>
                    {intl.formatMessage({id: 'spider.systemFile.fileUpload.fileTypesLabel'})} {usableFileTypeStringify}
                </div>

                <Button color={'primary'} variant={'contained'} size={'small'}>
                    {(error || fileOrFiles && fileOrFiles.length > 0) ?
                        intl.formatMessage({id: 'spider.systemFile.fileUpload.importActionLabelOnExistingFile'}) :
                        intl.formatMessage({id: 'spider.systemFile.fileUpload.importActionLabel'})
                    }
                </Button>
            </div>
        )
    }

    return (
        <FileUploader
            name="file"
            classes={`${props.classes.customFileInput} ${error ? props.classes.customFileInputError : (fileOrFiles && fileOrFiles.length > 0 ? props.classes.customFileInputSuccess : '')}`}
            fileOrFiles={fileOrFiles}
            types={usableFileType}
            multiple={multiple}
            maxSize={maxSize}
            minSize={minSize}
            children={getCustomDropZoneArea()}
            onTypeError={handleErrorType}
            onSizeError={handleSizeError}
            handleChange={handleChange}
        />
    )
}

export default withStyles(styles)(FileInputDragAndDrop);
