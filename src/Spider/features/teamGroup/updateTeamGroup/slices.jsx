import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    success: false,
    loading: false,
    error: null,
};

const createUpdateTeamGroupSlice = (name) => createSlice({
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
        clearUpdateTeamGroupState: () => initialState,
    },
});

export const updateTeamGroupKeySlice = createUpdateTeamGroupSlice('updateTeamGroupKey');

export const {
    updateStart: updateTeamGroupKeyStart,
    updateSuccess: updateTeamGroupKeySuccess,
    updateFailure: updateTeamGroupKeyFailure,
    clearUpdateTeamGroupState: updateTeamGroupKeyClear,
} = updateTeamGroupKeySlice.actions;

export default {
    updateTeamGroupKey: updateTeamGroupKeySlice.reducer
};
