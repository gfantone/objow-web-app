import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { getSystemFilesKeySlice} from './slices';

function* fetchSystemFiles(slice, endpoint, action) {
    try {
        const { teamGroupId } = action.payload;
        const data = yield call(endpoint, teamGroupId);
        yield put(slice.actions.fetchSuccess(data));
    } catch (error) {
        yield put(slice.actions.fetchFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchGetSystemFiles(slice, endpoint) {
    yield takeLatest(slice.actions.fetchStart.type, fetchSystemFiles, slice, endpoint);
}

export default function* getSystemFilesSaga() {
    yield all([
        watchGetSystemFiles(getSystemFilesKeySlice, api.systemImages.list),
    ]);
}
