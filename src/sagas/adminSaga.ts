
import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
import { ClientDataInterface } from '../interfaces/client.interface';
import { getClientsFailure, getClientsSuccess, createClientSuccess, createClientFailure } from '../store/clientsStore';

import { Admin } from '../api/admin'
import { createAdminSuccess ,createAdminFailure, getAdminFailure, getAdminSuccess } from '../store/adminStore';
import { AdminLoginInterface } from '../interfaces/admin.interface';

function* loginAdminFetchWorker(action : {
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

function* adminSaga() {
  yield all([
    takeEvery('admin/loginAdmin', loginAdminFetchWorker),
    takeEvery('admin/createAdminFetch', createAdminFetchWorker)
  ])
}

export default adminSaga