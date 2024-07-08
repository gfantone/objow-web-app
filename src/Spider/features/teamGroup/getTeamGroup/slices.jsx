import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    teamGroup: null,
    success: false,
    loading: false,
    error: null,
};

const createGetTeamGroupSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, data) => {
            state.teamGroup = data.payload.data
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        fetchFailure: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearGetTeamGroupState: () => initialState,
    },
});

export const getTeamGroupKeySlice = createGetTeamGroupSlice('getTeamGroupKey');

export const {
    fetchStart: getTeamGroupKeyStart,
    fetchSuccess: getTeamGroupKeySuccess,
    fetchFailure: getTeamGroupKeyFailure,
    clearGetTeamGroupState: getTeamGroupKeyClear,
} = getTeamGroupKeySlice.actions;

export default {
    getTeamGroupKey: getTeamGroupKeySlice.reducer,
};
