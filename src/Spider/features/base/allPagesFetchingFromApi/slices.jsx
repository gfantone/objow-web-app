import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: [],
    error: null,
    loading: false,
};

const allPagesFetchingFromApiSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        allPagesFetchingFromApiStart: (state) => {
            state.data = [];
            state.loading = true;
            state.error = null;
        },
        allPagesFetchingFromApiSuccess: (state, action) => {
            state.data = [...state.data, ...action.payload];
            state.loading = false;
            state.error = null;
        },
        allPagesFetchingFromApiFailure: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = action.payload;
        },
        clearAllPagesFetchingFromApiState: () => initialState,
    },
});

export const allHierarchyNodesFetchingSlice = allPagesFetchingFromApiSlice('nodeListFetching');

export const {allPagesFetchingFromApiStart: allHierarchyNodesFetchingStart} = allHierarchyNodesFetchingSlice.actions;

export default {
    allHierarchyNodesFetching: allHierarchyNodesFetchingSlice.reducer,
};
