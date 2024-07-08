import {all} from 'redux-saga/effects';

import {default as authSaga} from './auth/sagas';
<<<<<<< HEAD
=======
import {default as baseSaga} from './base/sagas';
import {default as configSaga} from './config/sagas';
import {default as teamGroupSaga} from './teamGroup/sagas';
import {default as systemImageSaga} from './systemFiles/sagas';
>>>>>>> dev

export default function* spiderSaga() {
    yield all([
        authSaga(),
<<<<<<< HEAD
=======
        baseSaga(),
        configSaga(),
        teamGroupSaga(),
        systemImageSaga(),
>>>>>>> dev
    ]);
}
