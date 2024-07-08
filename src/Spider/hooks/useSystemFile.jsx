import {useDispatch, useSelector} from "react-redux";
import {updateSystemFilesKeyClear, updateSystemFilesKeyStart} from "../features/systemFiles/updateSystemFiles/slices";
import {useEffect, useState} from "react";
import {deleteSystemFilesKeyClear, deleteSystemFilesKeyStart} from "../features/systemFiles/deleteSystemFiles/slices";
import useHandleToast from "./UseHandleToast";

const useSystemFile = ({ onFileUpdated }) => {
    const dispatch = useDispatch();
    const systemFileDeleted = useSelector(state => state.deleteSystemFilesKey);
    const systemFilesUpdated = useSelector(state => state.updateSystemFilesKey);
    const [ listener, setListener ] = useState(false)

    const clearListener = () => {
        setListener(false)
    }

    useHandleToast(systemFileDeleted, dispatch, deleteSystemFilesKeyClear,
        'spider.systemFile.delete.success',
        'spider.systemFile.delete.error', listener, clearListener)

    useHandleToast(systemFilesUpdated, dispatch, updateSystemFilesKeyClear,
        'spider.systemFile.update.success',
        'spider.systemFile.update.error', listener, clearListener)

    const deleteSystemFile = (imageData) => {
        setListener(true)
        dispatch(deleteSystemFilesKeyStart({ imageId: imageData.id }))
        // todo: make PUT to change the src and not delete the line itself
        // const file = new FormData();
        // file.append('code', code);
        // file.append('src', null);
        // dispatch(updateSystemFilesKeyStart({ code, file: { src: null }, teamGroupId }))
    }

    // manage only lone file for now
    const updateSystemFile = (fileData, code, teamGroupId) => {
        setListener(true)
        const file = new FormData();
        file.append('code', code);
        file.append('src', fileData);
        dispatch(updateSystemFilesKeyStart({ code, file, teamGroupId }))
    }

    useEffect(() => {
        if (systemFilesUpdated.systemFileUpdated !== null) {
            onFileUpdated(systemFilesUpdated.systemFileUpdated)
        }
    }, [systemFilesUpdated, dispatch]);

    return { deleteSystemFile, updateSystemFile }
}

export default useSystemFile;
