import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    success: false,
    loading: false,
    error: null,
};

const createUpdateConfigsSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        updateStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state) => {
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearUpdateConfigsState: () => initialState,
    },
});

export const updateConfigsKeySlice = createUpdateConfigsSlice('updateConfigsKey');

export const {
    updateStart: updateConfigKeyStart,
    updateSuccess: updateConfigKeySuccess,
    updateFailure: updateConfigKeyFailure,
    clearUpdateConfigsState: updateConfigKeyClear,
} = updateConfigsKeySlice.actions;

export default {
    updateConfigsKey: updateConfigsKeySlice.reducer
};
