import {all} from 'redux-saga/effects';

import {default as getConfigsSaga} from './getConfigs/sagas';
import {default as updateConfigsSaga} from './updateConfigs/sagas';

export default function* configSaga() {
    yield all([
        getConfigsSaga(),
        updateConfigsSaga(),
    ]);
}
