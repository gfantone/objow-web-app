import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { getTeamGroupKeySlice} from './slices';

function* fetchTeamGroup(slice, endpoint, action) {
    try {
        const { teamGroupId } = action.payload;
        const data = yield call(endpoint, teamGroupId);
        yield put(slice.actions.fetchSuccess(data));
    } catch (error) {
        console.error('error', error)
        yield put(slice.actions.fetchFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchGetTeamGroup(slice, endpoint) {
    yield takeLatest(slice.actions.fetchStart.type, fetchTeamGroup, slice, endpoint);
}

export default function* crudConfigSaga() {
    yield all([
        watchGetTeamGroup(getTeamGroupKeySlice, api.teamGroups.get),
    ]);
}
