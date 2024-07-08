import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import {Button} from "../../../../../../components";
import {Trash, Edit} from 'iconsax-react';
import {RightDialogFileInput} from "../../../../../../components/RightDialogFileInput";
import useSystemFile from "../../../../../../hooks/useSystemFile";

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
    }
}

const EditableImage = ({ imageData, code, teamGroupId, title, defaultColor = '', altImage, imageWidth, imageHeight, onImageUpdate, ...props }) => {
    const [isOpenScreenRightDialog, setIsOpenScreenRightDialog] = useState(false);

    const onFileUpdated = (imageUpdated) => {
        setIsOpenScreenRightDialog(false)
        onImageUpdate(imageUpdated)
    }

    const { updateSystemFile, deleteSystemFile } = useSystemFile({ onFileUpdated });

    const deleteImage = () => {
        if (!imageData) return
        deleteSystemFile(imageData)
    };

    const updateImage = (files) => {
        if (!code) return
        updateSystemFile(files[0], code, teamGroupId)
    }

    const openEditImage = () => {
        setIsOpenScreenRightDialog(true)
    };

    return (
        <div className={props.classes.editableImage} style={{ background: defaultColor }}>
            { imageData && <img alt={altImage} src={imageData.src} width={imageWidth} height={imageHeight}/> }
            <div className={props.classes.editableImageActions}>
                { imageData && (<Button variant={'contained'} color={'primary'} className={'size-tiny icon'} disableRipple
                         onClick={deleteImage}>
                    <Trash/>
                </Button>)}
                <Button variant={'contained'} color={'primary'} className={'size-tiny icon'} disableRipple
                         onClick={openEditImage}>
                    <Edit/>
                </Button>
            </div>

            <RightDialogFileInput open={isOpenScreenRightDialog}
                                  title={title}
                                  setOpen={(value) => setIsOpenScreenRightDialog(value)}
                                  onValid={updateImage}
            />
        </div>
    )
}

export default withStyles(styles)(EditableImage);
