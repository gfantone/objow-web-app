import {all} from 'redux-saga/effects';

import {default as getTeamGroupSaga} from './getTeamGroup/sagas';
import {default as updateTeamGroupSaga} from './updateTeamGroup/sagas';

export default function* teamGroupSaga() {
    yield all([
        getTeamGroupSaga(),
        updateTeamGroupSaga(),
    ]);
}
