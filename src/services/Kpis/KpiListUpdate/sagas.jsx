import { all, call, put, takeLatest } from 'redux-saga/effects';
import { updateKpiListSuccess, updateKpiListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateKpiList(action) {
  try {
    yield all(
      action.kpis.map((kpi) =>
        call(api.kpis.update, kpi.id, kpi.isActive, kpi.params),
      ),
    );
    yield put(updateKpiListSuccess());
  } catch (e) {
    yield put(updateKpiListError());
  }
}

function* watchKpiListUpdate() {
  yield takeLatest(types.UPDATE_KPI_LIST, updateKpiList);
}

export default watchKpiListUpdate;
