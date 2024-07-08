import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../../data/api/api';
import {resendAccountActivationKeySlice, verifyAccountActivationKeySlice, validateAccountSlice} from './slices';

function* fetchAccountActivation(slice, endpoint, action) {
    try {
        const {key, contract} = action.payload;
        const data = yield call(endpoint, key, contract);
        yield put(slice.actions.fetchSuccess(data));
    } catch (error) {
        yield put(slice.actions.fetchFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchAccountActivation(slice, endpoint) {
    yield takeLatest(slice.actions.fetchStart.type, fetchAccountActivation, slice, endpoint);
}

export default function* accountActivationSaga() {
    yield all([
        watchAccountActivation(verifyAccountActivationKeySlice, api.auth.verifyAccountActivationKey),
        watchAccountActivation(validateAccountSlice, api.auth.activateAccount),
        watchAccountActivation(resendAccountActivationKeySlice, api.auth.resendAccountActivationKey),
    ]);
}
