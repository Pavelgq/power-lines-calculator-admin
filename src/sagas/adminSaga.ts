import { call, put, takeEvery, fork, all } from "redux-saga/effects";

import axios, { AxiosError, AxiosResponseHeaders } from "axios";
import { Admin } from "../api/admin";
import {
  createAdminSuccess,
  createAdminFailure,
  getAdminFailure,
  getAdminSuccess,
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
    localStorage.setItem("token", formatingAdminData.token);
    yield put(getAdminSuccess(formatingAdminData));
  } catch (e) {
    const error = e as AxiosError;
    if (axios.isAxiosError(e) && e.response) {
      yield put(getAdminFailure({ ...e.response.data, error: true }));
    } else {
      yield put(getAdminFailure(e));
    }
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
    const candidate: AxiosResponseHeaders = yield call(admin.profile, token);
    const res: AdminDataInterface = yield candidate.data;
    yield put(profileAdminSuccess(res));
  } catch (error) {
    console.log("error profile", error);
    yield put(logoutAdmin());
  }
}

function* logoutAdminWorker() {
  yield localStorage.setItem("token", "");
}

function* adminSaga() {
  yield all([
    takeEvery("admin/logoutAdmin", logoutAdminWorker),
    takeEvery("admin/loginAdmin", loginAdminWorker),
    takeEvery("admin/createAdminFetch", createAdminFetchWorker),
    takeEvery("admin/profileAdmin", profileAdminWorker),
  ]);
}

export default adminSaga;
