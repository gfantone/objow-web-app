import {all, call, put, takeLatest} from 'redux-saga/effects';
import api from '../../../../data/api/api';
import {allHierarchyNodesFetchingSlice} from './slices';

function* fetchAllPagesFromApi(slice, endpoint, action) {
    try {
        let page = 1;
        let nextUrl = null;
        const params = action.payload;

        do {
            const {data} = yield call(endpoint, ...params, page);
            yield put(slice.actions.allPagesFetchingFromApiSuccess(data.results));

            nextUrl = data.next;
            page++;
        } while (nextUrl);
    } catch (error) {
        yield put(slice.actions.allPagesFetchingFromApiFailure(error));
    }
}

function* watchAllPagesFetchingFromApi(slice, endpoint) {
    yield takeLatest(slice.actions.allPagesFetchingFromApiStart.type, fetchAllPagesFromApi, slice, endpoint);
}

export default function* fetchAllPagesFromApiSaga() {
    yield all([
        watchAllPagesFetchingFromApi(allHierarchyNodesFetchingSlice, api.hierarchyNodes.list),
    ]);
}
