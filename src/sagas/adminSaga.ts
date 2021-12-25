
import { call, put, takeEvery, fork, all } from 'redux-saga/effects'

import { Admin } from '../api/admin'
import { createAdminSuccess ,createAdminFailure, getAdminFailure, getAdminSuccess, profileAdmin, logoutAdmin  } from '../store/adminStore';
import { AdminLoginInterface } from '../interfaces/admin.interface';

function* loginAdminWorker(action : {
    payload: any;
    type: string;
}) {
  try {
    const admin = new Admin();
    
    const { token, ...authData} = action.payload;
    console.log('work', authData)
    const adminData = yield call(admin.login, authData, token);
    const formatingAdminData = yield adminData.json();
    yield put(getAdminSuccess(formatingAdminData));
  } catch(e) {
    yield put(getAdminFailure(e));
  }
  
}

function* createAdminFetchWorker(action: {
    payload: any;
    type: string;
}) {
  try {
    const admin = new Admin();

    const { token, id} = action.payload;
    const candidate = yield call(admin.getAdmin, id, token);
    const res = yield candidate.json();
    console.log(res);
    yield put(createAdminSuccess(res));
  } catch (e) {
    yield put(createAdminFailure(e));
  }
}

function * profileAdminWorker (action: {
    payload: any;
    type: string;
}) {
  try {
    const admin = new Admin();
    const { token } = action.payload;
    yield call(admin.profile, token)
    yield put(profileAdmin());
  } catch (error) {
    console.log(error)
    yield put(logoutAdmin(error));
  }
}

function* adminSaga() {
  yield all([
    takeEvery('admin/loginAdmin', loginAdminWorker),
    takeEvery('admin/createAdminFetch', createAdminFetchWorker),
    takeEvery('admin/profileAdmin', profileAdminWorker)
  ])
}

export default adminSaga