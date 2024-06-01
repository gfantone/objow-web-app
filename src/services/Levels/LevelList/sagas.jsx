import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getLevelListSuccess, getLevelListError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getLevelList(action) {
  try {
    var { data: levels } = yield call(api.periods.levels, action.periodId);
    const playerList = yield all(
      levels.map((level) => call(api.levels.successfulCollaborators, level.id)),
    );
    levels.map((level) => {
      const index = levels.indexOf(level);
      level.players = playerList[index].data;
    });
    yield put(getLevelListSuccess(levels));
  } catch (e) {
    yield put(getLevelListError());
  }
}

function* watchLevelList() {
  yield takeLatest(types.GET_LEVEL_LIST, getLevelList);
}

export default watchLevelList;
