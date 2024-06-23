import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    success: false,
    loading: false,
    error: null,
};

const createAccountActivationSlice = (name) => createSlice({
    name: name,
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action) => {
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        fetchFailure: (state, action) => {

            state.success = false;
            state.loading = false;
            state.error = action.payload;
        },
        clearAccountActivationState: () => initialState,
    },
});

export const verifyAccountActivationKeySlice = createAccountActivationSlice('verifyAccountActivationKey');
export const validateAccountSlice = createAccountActivationSlice('validateAccount');
export const resendAccountActivationKeySlice = createAccountActivationSlice('resendAccountActivationKey');

export const {
    fetchStart: verifyAccountActivationKeyStart,
    fetchSuccess: verifyAccountActivationKeySuccess,
    fetchFailure: verifyAccountActivationKeyFailure,
    clearAccountActivationState: verifyAccountActivationKeyClear,
} = verifyAccountActivationKeySlice.actions;
export const {
    fetchStart: validateAccountStart,
    fetchSuccess: validateAccountSuccess,
    fetchFailure: validateAccountFailure,
    clearAccountActivationState: validateAccountClear,
} = validateAccountSlice.actions;
export const {
    fetchStart: resendAccountActivationKeyStart,
    fetchSuccess: resendAccountActivationKeySuccess,
    fetchFailure: resendAccountActivationKeyFailure,
    clearAccountActivationState: resendAccountActivationKeyClear,
} = resendAccountActivationKeySlice.actions;

export default {
    verifyAccountActivationKey: verifyAccountActivationKeySlice.reducer,
    validateAccount: validateAccountSlice.reducer,
    resendAccountActivationKey: resendAccountActivationKeySlice.reducer,
};
