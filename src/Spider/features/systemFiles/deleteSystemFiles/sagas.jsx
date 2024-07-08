import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { deleteSystemFilesKeySlice} from './slices';

function* deleteSystemFiles(slice, endpoint, action) {
    try {
        const { imageId } = action.payload;
        yield call(endpoint, imageId);
        yield put(slice.actions.deleteSuccess());
    } catch (error) {
        // todo: after mock -> yield put(slice.actions.deleteFailure(error?.response?.data?.error ?? 'UNKNOWN'));
        yield put(slice.actions.deleteSuccess());
    }
}

function* watchDeleteSystemFiles(slice, endpoint) {
    yield takeLatest(slice.actions.deleteStart.type, deleteSystemFiles, slice, endpoint);
}

export default function* deleteSystemFilesSaga() {
    yield all([
        watchDeleteSystemFiles(deleteSystemFilesKeySlice, api.systemImages.delete),
    ]);
}
