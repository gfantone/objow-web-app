import {all} from 'redux-saga/effects';

import {default as fetchAllPagesFromApiSaga} from './allPagesFetchingFromApi/sagas';

export default function* authSaga() {
    yield all([
        fetchAllPagesFromApiSaga()
    ]);
}
