import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    systemFiles: [],
    success: false,
    loading: false,
    error: null,
};

const createGetSystemFilesSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, data) => {
            state.systemFiles = data.payload.data
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        fetchFailure: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearGetSystemFilesState: () => initialState,
    },
});

export const getSystemFilesKeySlice = createGetSystemFilesSlice('getSystemFilesKey');

export const {
    fetchStart: getSystemFilesKeyStart,
    fetchSuccess: getSystemFilesKeySuccess,
    fetchFailure: getSystemFilesKeyFailure,
    clearGetSystemFilesState: getSystemFilesKeyClear,
} = getSystemFilesKeySlice.actions;

export default {
    getSystemFilesKey: getSystemFilesKeySlice.reducer,
};
