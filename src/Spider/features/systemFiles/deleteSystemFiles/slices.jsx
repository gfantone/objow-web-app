import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    success: false,
    loading: false,
    error: null,
};

const createDeleteSystemFilesSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        deleteStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state) => {
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearDeleteSystemFilesState: () => initialState,
    },
});

export const deleteSystemFilesKeySlice = createDeleteSystemFilesSlice('deleteSystemFilesKey');

export const {
    deleteStart: deleteSystemFilesKeyStart,
    deleteSuccess: deleteSystemFilesKeySuccess,
    deleteFailure: deleteSystemFilesKeyFailure,
    clearDeleteSystemFilesState: deleteSystemFilesKeyClear,
} = deleteSystemFilesKeySlice.actions;

export default {
    deleteSystemFilesKey: deleteSystemFilesKeySlice.reducer,
};
