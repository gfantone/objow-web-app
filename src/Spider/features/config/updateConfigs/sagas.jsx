import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { updateConfigsKeySlice} from './slices';

function* updateConfigs(slice, endpoint, action) {
    try {
        yield all(
            action.payload.map((config) =>
                call(api.configs.update, config.id, config.value),
            ),
        );
        yield put(slice.actions.updateSuccess());
    } catch (error) {
        yield put(slice.actions.updateFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchUpdateConfigs(slice, endpoint) {
    yield takeLatest(slice.actions.updateStart.type, updateConfigs, slice, endpoint);
}

export default function* updateConfigsSaga() {
    yield all([
        watchUpdateConfigs(updateConfigsKeySlice, api.configs.update),
    ]);
}
