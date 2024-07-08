import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { updateSystemFilesKeySlice} from './slices';

function* updateSystemFiles(slice, endpoint, action) {
    try {
        const { code, file } = action.payload;
        const data = yield call(endpoint, code, file);
        yield put(slice.actions.updateSuccess(data.data));
    } catch (error) {
        // todo: after mock -> yield put(slice.actions.updateFailure(error?.response?.data?.error ?? 'UNKNOWN'));
        // yield put(slice.actions.updateFailure(error?.response?.data?.error ?? 'UNKNOWN'));
        yield put(slice.actions.updateSuccess({ id: '', src: '', code: '' }));
    }
}

function* watchUpdateSystemFiles(slice, endpoint) {
    yield takeLatest(slice.actions.updateStart.type, updateSystemFiles, slice, endpoint);
}

export default function* updateSystemFilesSaga() {
    yield all([
        watchUpdateSystemFiles(updateSystemFilesKeySlice, api.systemImages.update),
    ]);
}
