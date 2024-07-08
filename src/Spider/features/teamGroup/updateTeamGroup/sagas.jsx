import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../data/api/api';
import { updateTeamGroupKeySlice} from './slices';

function* updateTeamGroup(slice, endpoint, action) {
    try {
        const { teamGroup } = action.payload;
        const data = yield call(endpoint, teamGroup);
        yield put(slice.actions.updateSuccess(data));
    } catch (error) {
        yield put(slice.actions.updateFailure(error?.response?.data?.error ?? 'UNKNOWN'));
    }
}

function* watchUpdateTeamGroup(slice, endpoint) {
    yield takeLatest(slice.actions.updateStart.type, updateTeamGroup, slice, endpoint);
}

export default function* updateTeamGroupSaga() {
    yield all([
        watchUpdateTeamGroup(updateTeamGroupKeySlice, api.teamGroups.update),
    ]);
}
