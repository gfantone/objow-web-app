import {DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMarker, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import {ScreenRightDialog} from "../../../../components/ScreenRightDialog";
import FileInputDragAndDrop from "../../../../components/FileInputDragAndDrop/FileInputDragAndDrop";
import {Button} from "../../../../components";

const styles = {
    editableImage: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    editableImageActions: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '0.4rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem'
    },
    editableImageActionsButton: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '0.3rem'
    }
}

const EditableImage = ({ altImage = 'alt', ...props }) => {

    const [isOpenScreenRightDialog, setIsOpenScreenRightDialog] = useState(false);

    return (
        <div className={props.classes.editableImage}>
            <img alt={altImage}/>
            <div className={props.classes.editableImageActions}>
                <IconButton className={props.classes.editableImageActionsButton} size="small" onClick={() => {}}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
                <IconButton className={props.classes.editableImageActionsButton} size="small" onClick={() => setIsOpenScreenRightDialog(true)}>
                    <FontAwesomeIcon icon={faMarker} />
                </IconButton>
            </div>

            <ScreenRightDialog open={isOpenScreenRightDialog} onClose={() => setIsOpenScreenRightDialog(false)}>
                <DialogTitle style={{ display: 'flex', flexDirection: 'row-reverse', padding: '1rem' }}>
                    <IconButton size="small" onClick={() => setIsOpenScreenRightDialog(false)}>
                        <FontAwesomeIcon icon={faMarker} />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '0rem 2rem 2rem 2rem', gap: '1rem', marginX: 'auto' }}>
                    <h1 style={{}}>Modifier l'image de fond</h1>
                    <FileInputDragAndDrop fileOrFilesChanged={(files) => console.log('files', files)}/>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant={'contained'}>Valider</Button>
                    </div>
                </DialogContent>
            </ScreenRightDialog>
        </div>
    )
}

export default withStyles(styles)(EditableImage);
