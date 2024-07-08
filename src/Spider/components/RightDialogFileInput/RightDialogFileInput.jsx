import {ScreenRightDialog} from "../ScreenRightDialog";
import {DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {Button} from "../index";
import {CloseSquare} from "iconsax-react";
import FileInputDragAndDrop from "../FileInputDragAndDrop/FileInputDragAndDrop";
import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import {useIntl} from "react-intl";

const styles= {
    dialogTitle: {
        display: 'flex !important',
        flexDirection: 'row-reverse !important',
        padding: '1rem !important'
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '0rem 2rem 2rem 2rem !important',
        gap: '1rem',
        margin: 'auto !important'
    },
    previewImage: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: '16px'
    },
    image: {
        overflow: 'clip'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
};

const fileToDataUri = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const RightDialogFileInput = ({ open, setOpen, title, onValid, minSize, maxSize, multiple, authorizedFileTypes, ...props }) => {
    const intl = useIntl();
    const [files, setFiles] = useState([]);
    const [dataUri, setDataUri] = useState('')

    const clearState = () => {
        setFiles([])
        setDataUri('')
    }

    const fileChanged = (files) => {
        clearState()

        if (!files || files.find(file => !file) !== undefined) return

        if (!multiple && files[0].type.includes('image')) {
            fileToDataUri(files[0])
                .then(dataUri => {
                    setDataUri(dataUri)
                })
        }

        setFiles(files)
    };

    const onClose = () => {
        clearState()
        setOpen(false)
    };

    return (
        <ScreenRightDialog open={open} onClose={onClose}>
            <DialogTitle className={props.classes.dialogTitle}>
                <Button variant={'contained'} color={'primary'} className={'size-tiny icon'} disableRipple
                        onClick={onClose}>
                    <CloseSquare/>
                </Button>
            </DialogTitle>
            <DialogContent className={props.classes.dialogContent}>
                <Typography variant="h1" component="h1" align={'center'}>
                    { title }
                </Typography>
                <FileInputDragAndDrop minSize={minSize}
                                      maxSize={maxSize}
                                      multiple={multiple}
                                      authorizedFileTypes={authorizedFileTypes}
                                      fileOrFilesChanged={fileChanged}
                />
                {(!multiple && files[0] && files[0].type.includes('image')) &&
                    <div className={props.classes.previewImage}>
                        <img alt={intl.formatMessage({id: 'spider.imageAlt.preview'})}
                             src={dataUri}
                             width={'100%'}
                             className={props.classes.image}
                        />
                    </div>
                }
                <div className={props.classes.actions}>
                    <Button color={'primary'} variant={'contained'} size={'small'} disabled={!files || files.length === 0}
                            onClick={() => onValid(files)}>
                        Valider
                    </Button>
                </div>
            </DialogContent>
        </ScreenRightDialog>
    )
};

export default withStyles(styles)(RightDialogFileInput);
