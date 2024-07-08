import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    configs: null,
    success: false,
    loading: false,
    error: null,
};

const createCrudConfigSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, data) => {
            state.configs = data.payload.data
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        fetchFailure: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearCrudConfigState: () => initialState,
    },
});

export const getConfigsKeySlice = createCrudConfigSlice('getConfigsKey');

export const {
    fetchStart: getConfigsKeyStart,
    fetchSuccess: getConfigsKeySuccess,
    fetchFailure: getConfigsKeyFailure,
    clearCrudConfigState: getConfigsKeyClear,
} = getConfigsKeySlice.actions;

export default {
    getConfigsKey: getConfigsKeySlice.reducer,
};
