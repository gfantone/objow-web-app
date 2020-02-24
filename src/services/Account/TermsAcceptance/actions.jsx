import * as types from './actionTypes'

export const acceptTerms = (useTermsAccepted, privacyPolicyAccepted) => {
    return {
        type: types.ACCEPT_TERMS,
        useTermsAccepted,
        privacyPolicyAccepted
    }
};

export const acceptTermsSuccess = () => {
    return {
        type: types.ACCEPT_TERMS_SUCCESS
    }
};

export const acceptTermsError = () => {
    return {
        type: types.ACCEPT_TERMS_ERROR
    }
};
