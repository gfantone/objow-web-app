import {FileUploader} from "react-drag-drop-files";
import React, {useState} from "react";
import './FileInputDragAndDrop.css'
import Button from "../Button";

// todo: see how it goes to use this way
// const styles = {
//     customAirDrop: {
//         display: 'flex'
//     }
// };

const FileInputDragAndDrop = ({fileOrFilesChanged, multiple = false, authorizedFileTypes = ["JPG", "PNG"]}) => {
    const [fileOrFiles, setFileOrFiles] = useState(multiple ? [] : null);
    const usableFileType = authorizedFileTypes

    const usableFileTypeStringify = usableFileType
        .map((fileType) => `.${fileType.toLowerCase()}`)
        .join(', ')

    const handleChange = (fileOrFilesItem) => {
        // todo: might need to set the file again to null
        const newFileOrFiles = multiple ? [...fileOrFilesItem] : [fileOrFilesItem]
        fileOrFilesChanged(newFileOrFiles)
        setFileOrFiles((previousFiles) => {
            return multiple ? [...previousFiles, ...newFileOrFiles] : newFileOrFiles
        })
    };

    const handleErrorType = (error) => {
        // todo: see how we show the error to the user
        console.log(error)
    }

    const handleSizeError = (sizeError) => {
        // todo: see how we show the error to the user
        console.log(sizeError)
    }

    const getCustomDropZoneArea = () => {
        return (
            <div>
                <div className={'customFileInputIcon'}>icon</div>

                <div className={'customFileInputLabel'}>Glisser / déposer votre fichier ici</div>
                <div className={'customFileInputFileType'}>Type fichier autorisés: {usableFileTypeStringify}</div>

                <Button variant={'contained'}>Importer un fichier</Button>
            </div>
        )
    }

    // fileOrFiles={fileOrFiles}
    // todo: use intl.formatMessage({ id: 'common.close' }) for all static label
    return (
        <FileUploader
            name="file"
            classes={"customFileInput"}
            label={'Glisser / déposer votre fichier ici'}
            fileOrFiles={fileOrFiles}
            types={usableFileType}
            multiple={multiple}
            children={getCustomDropZoneArea()}
            onTypeError={handleErrorType}
            onSizeError={handleSizeError}
            handleChange={handleChange}
        />
    )
}

export default FileInputDragAndDrop;
