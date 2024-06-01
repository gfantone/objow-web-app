import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCollaboratorGoalCategoriesSuccess,
  getCollaboratorGoalCategoriesError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getCollaboratorGoalCategories(action) {
  try {
    const { data: categories } = yield call(
      api.collaborators.goalCategories,
      action.id,
      action.year,
    );
    yield put(getCollaboratorGoalCategoriesSuccess(categories));
  } catch (e) {
    yield put(getCollaboratorGoalCategoriesError());
  }
}

function* watchCollaboratorGoalCategoryList() {
  yield takeLatest(
    types.GET_COLLABORATOR_GOAL_CATEGORY_LIST,
    getCollaboratorGoalCategories,
  );
}

export default watchCollaboratorGoalCategoryList;
