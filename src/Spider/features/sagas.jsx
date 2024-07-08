import {all} from 'redux-saga/effects';

import {default as authSaga} from './auth/sagas';
import {default as configSaga} from './config/sagas';
import {default as teamGroupSaga} from './teamGroup/sagas';

export default function* spiderSaga() {
    yield all([
        authSaga(),
        configSaga(),
        teamGroupSaga(),
    ]);
}
