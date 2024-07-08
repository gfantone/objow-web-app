import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    systemFileUpdated: null,
    success: false,
    loading: false,
    error: null,
};

const createUpdateSystemFilesSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        updateStart: (state) => {
            state.systemFileUpdated = null;
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, data) => {
            state.systemFileUpdated = data.payload
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.systemFileUpdated = null;
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearUpdateSystemFilesState: () => initialState,
    },
});

export const updateSystemFilesKeySlice = createUpdateSystemFilesSlice('updateSystemFilesKey');

export const {
    updateStart: updateSystemFilesKeyStart,
    updateSuccess: updateSystemFilesKeySuccess,
    updateFailure: updateSystemFilesKeyFailure,
    clearUpdateSystemFilesState: updateSystemFilesKeyClear,
} = updateSystemFilesKeySlice.actions;

export default {
    updateSystemFilesKey: updateSystemFilesKeySlice.reducer,
};
