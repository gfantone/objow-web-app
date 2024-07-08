import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { getConfigsKeySlice} from './slices';

function* fetchCrudConfig(slice, endpoint, action) {
    try {
        const { teamGroupId, codes } = action.payload;
        const data = yield call(endpoint, teamGroupId, codes);
        yield put(slice.actions.fetchSuccess(data));
    } catch (error) {
        yield put(slice.actions.fetchFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchCrudConfig(slice, endpoint) {
    yield takeLatest(slice.actions.fetchStart.type, fetchCrudConfig, slice, endpoint);
}

export default function* crudConfigSaga() {
    yield all([
        watchCrudConfig(getConfigsKeySlice, api.configs.permanent),
    ]);
}
