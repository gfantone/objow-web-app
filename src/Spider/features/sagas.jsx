import {all} from 'redux-saga/effects';

import {default as authSaga} from './auth/sagas';

export default function* spiderSaga() {
    yield all([
        authSaga(),
    ]);
}
