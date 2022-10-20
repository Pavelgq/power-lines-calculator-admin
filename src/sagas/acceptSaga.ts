import { AxiosResponseHeaders } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { Accept } from "../api/accept";
import {
  AcceptDateInterface,
  AcceptKeyInterface,
  AcceptTokenInterface,
} from "../interfaces/accept.interface";
import {
  checkAcceptKeySuccess,
  checkAcceptKeyFailure,
  createAcceptKeySuccess,
  createAcceptKeyFailure,
  getAcceptKeySuccess,
  getAcceptKeyFailure,
  changeAcceptKeySuccess,
  changeAcceptKeyFailure,
  deleteAcceptKeyFailure,
  deleteAcceptKeySuccess,
  sendAcceptKeyFailure,
  sendAcceptKeySuccess,
} from "../store/acceptStore";

function* checkAcceptKeyWorker(action: { payload: any; type: string }) {
  try {
    const acceptKey = new Accept();
    const { key } = action.payload;
    const res: AxiosResponseHeaders = yield call(acceptKey.checkAcceptKey, key);
    console.log("acceptKey", res);
    const token: AcceptTokenInterface = yield res.data;
    localStorage.setItem("acceptToken", token.acceptToken);
    yield put(checkAcceptKeySuccess());
  } catch (error) {
    yield put(checkAcceptKeyFailure(error));
  }
}

function* createAcceptKeyWorker(action: {
  payload: {
    token: string;
    clientId: string;
    data: AcceptDateInterface;
  };
  type: string;
}) {
  try {
    const acceptKey = new Accept();
    const { token, clientId, data } = action.payload;
    
    const res: AxiosResponseHeaders = yield call(
      acceptKey.createAcceptKey,
      token,
      clientId,
      data
    );
    const newKey: AcceptKeyInterface = yield res.data;
    yield put(
      createAcceptKeySuccess({ ...newKey, clientId, validDate: data.validDate })
    );
  } catch (error) {
    yield put(createAcceptKeyFailure(error));
  }
}

function* getAcceptKeyWorker(action: {
  payload: { token: string; clientId: number };
  type: string;
}) {
  try {
    const acceptKey = new Accept();
    const { token, clientId } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      acceptKey.getAcceptKey,
      token,
      clientId
    );
    const clientKey: AcceptKeyInterface = yield res.data;
    yield put(getAcceptKeySuccess(clientKey));
  } catch (error) {
    yield put(getAcceptKeyFailure(error));
  }
}

function* changeAcceptKeyWorker(action: {
  payload: {
    token: string;
    clientId: string;
    data: AcceptDateInterface;
  };
  type: string;
}) {
  try {
    const acceptKey = new Accept();
    const { token, clientId, data } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      acceptKey.changeAcceptKey,
      token,
      Number(clientId),
      data
    );
    const newKey: AcceptKeyInterface = yield res.data;
    yield put(
      changeAcceptKeySuccess({ ...newKey, clientId, validDate: data.validDate })
    );
  } catch (error) {
    yield put(changeAcceptKeyFailure(error));
  }
  
}

function* deleteAcceptKeyWorker(action: {
  payload: { token: string; clientId: number };
  type: string;
}) {
  try {
    const acceptKey = new Accept();
    const { token, clientId } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      acceptKey.getAcceptKey,
      token,
      clientId
    );
    yield put(deleteAcceptKeySuccess());
  } catch (error) {
    yield put(deleteAcceptKeyFailure(error));
  }
}
function* sendAcceptKeyWorker(action: {
  payload: { token: string; key: string, email: string };
  type: string;
}) {
  try {
    const acceptKey = new Accept();
    const {token, key, email} = action.payload;
    const res: {data: {}} = yield call(
      acceptKey.sendAcceptKey,
      token,
      key,
      email
    );
    yield put(sendAcceptKeySuccess({...res.data}));
  } catch (error) {
    yield put(sendAcceptKeyFailure(error));
  }
}

function* acceptSaga() {
  yield all([
    takeEvery("accept/checkAcceptKey", checkAcceptKeyWorker),
    takeEvery("accept/createAcceptKey", createAcceptKeyWorker),
    takeEvery("accept/getAcceptKey", getAcceptKeyWorker),
    takeEvery("accept/changeAcceptKey", changeAcceptKeyWorker),
    takeEvery("accept/deleteAcceptKey", deleteAcceptKeyWorker),
    takeEvery("accept/sendAcceptKey", sendAcceptKeyWorker)
  ]);
}

export default acceptSaga;
