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
  changeAdminFailure,
  changeAdminSuccess,
  deleteAdminFailure,
  deleteAdminSuccess,
  getAdminsSuccess,
  getAdminsFailure,
} from "../store/adminStore";
import {
  AdminDataInterface,
  AdminFullInterface,
  AdminLoginInterface,
  ROLES,
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

function* getClientsFetchWorker(action: {payload: any, type: string}) {
  try {
    const admin = new Admin();
    const { token } = action.payload;

    const adminData: AxiosResponseHeaders = yield call(admin.getAdmins, token);
    const formatingAdminData: AdminFullInterface[] = yield adminData.data;
    yield put(getAdminsSuccess(formatingAdminData));
  } catch (e) {
    const error = e as AxiosError;
     yield put(getAdminsFailure(e));
  }
}

function* createAdminFetchWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();

    const { token, adminData } = action.payload;

    if (adminData.password !== adminData.repeatPassword) {
      throw new Error('Пароли не совпадают');
    }

    const candidate: AxiosResponseHeaders = yield call(
      admin.createAdmin,
      token, 
      {login: adminData.login, password: adminData.password, status: ROLES.USER}
    );

    const res: AdminFullInterface = yield candidate.data;
    console.log(res);
    yield put(createAdminSuccess(res));
  } catch (e) {
    if (typeof e  === 'string') {
      yield put(createAdminFailure({message: e}));
    }
    yield put(createAdminFailure(e));
  }
}

function* changeAdminFetchWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();
    console.log(action.payload)
    const { token, adminData, id } = action.payload;
    if (adminData.password !== adminData.repeatPassword) {
      throw new Error('Пароли не совпадают');
    }
    const candidate: AxiosResponseHeaders = yield call(
      admin.changeAdmin,
      id,
      token,
      adminData.login,
      adminData.password
    );

    const res: AdminFullInterface = yield candidate.data;
    console.log(res);
    yield put(changeAdminSuccess(res));
  } catch (e) {
    if (typeof e  === 'string') {
      yield put(changeAdminFailure({message: e}));
    }
    yield put(changeAdminFailure(e));
  }
}

function* deleteAdminFetchWorker(action: { payload: any; type: string }) {
  try {
    const admin = new Admin();
    console.log(action.payload)
    const { token, id } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      admin.deleteAdmin,
      id,
      token,
    );

    const res: AdminFullInterface = yield candidate.data;
    console.log(res);
    yield put(deleteAdminSuccess(res));
  } catch (e) {
    yield put(deleteAdminFailure(e));
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
    takeEvery("admin/changeAdminFetch", changeAdminFetchWorker),
    takeEvery("admin/deleteAdminFetch", deleteAdminFetchWorker),
    takeEvery("admin/profileAdmin", profileAdminWorker),
    takeEvery("admin/getAdminsFetch", getClientsFetchWorker),
  ]);
}

export default adminSaga;
