import { call, put, takeEvery, fork, all } from "redux-saga/effects";

import { AxiosResponseHeaders } from "axios";
import { Admin } from "../api/admin";
import {
  createAdminSuccess,
  createAdminFailure,
  getAdminFailure,
  getAdminSuccess,
  profileAdmin,
  profileAdminSuccess,
  logoutAdmin,
} from "../store/adminStore";
import {
  AdminDataInterface,
  AdminFullInterface,
  AdminLoginInterface,
} from "../interfaces/admin.interface";

function* loginAdminWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();

    const { ...authData } = action.payload;
    const adminData: AxiosResponseHeaders = yield call(admin.login, authData);
    const formatingAdminData: AdminFullInterface = yield adminData.data;
    localStorage.setItem('token', formatingAdminData.token);
    console.log("admin data in saga", formatingAdminData);
    yield put(getAdminSuccess(formatingAdminData));
  } catch (e) {
    yield put(getAdminFailure(e));
  }
}

function* createAdminFetchWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();

    const { token, id } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      admin.getAdmin,
      id,
      token
    );

    const res: AdminFullInterface = yield candidate.data;
    console.log(res);
    yield put(createAdminSuccess(res));
  } catch (e) {
    yield put(createAdminFailure(e));
  }
}

function* profileAdminWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();
    const { token } = action.payload;
    yield call(admin.profile, token);
    yield put(profileAdminSuccess());
  } catch (error) {
    yield put(logoutAdmin(error));
  }
}

function* adminSaga() {
  yield all([
    takeEvery("admin/loginAdmin", loginAdminWorker),
    takeEvery("admin/createAdminFetch", createAdminFetchWorker),
    takeEvery("admin/profileAdmin", profileAdminWorker),
  ]);
}

export default adminSaga;
