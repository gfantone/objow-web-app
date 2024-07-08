import {all} from 'redux-saga/effects';

import {default as getSystemImageSaga} from './getSystemFiles/sagas';
import {default as updateSystemImageSaga} from './updateSystemFiles/sagas';
import {default as deleteSystemImageSaga} from './deleteSystemFiles/sagas';

export default function* systemImageSaga() {
    yield all([
        getSystemImageSaga(),
        updateSystemImageSaga(),
        deleteSystemImageSaga(),
    ]);
}
