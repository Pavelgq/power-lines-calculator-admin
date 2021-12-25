import { AxiosResponseHeaders } from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import { Client } from "../api/client";
import { ClientDataInterface } from "../interfaces/client.interface";
import { AnswerInterface } from "../interfaces/common.interface";
import {
  getClientsFailure,
  getClientsSuccess,
  createClientSuccess,
  createClientFailure,
  getOneClientSuccess,
  getOneClientFailure,
} from "../store/clientsStore";

function* getClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    console.log("getClientsFetch", action);
    const client = new Client();
    const { token } = action.payload;
    const res: AxiosResponseHeaders = yield call(client.getAllClients, token);
    const clientsData: ClientDataInterface[] = yield res.data;
    yield put(getClientsSuccess(clientsData));
  } catch (e) {
    yield put(getClientsFailure(e));
  }
}

function* getOneClientFetchWorker(action: { payload: any; type: string }) {
  try {
    console.log("getOneClientFetch", action);
    const client = new Client();
    const { token, id } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      client.getOneClient,
      token,
      id
    );
    const clientsData: ClientDataInterface = yield res.data;
    yield put(getOneClientSuccess(clientsData));
  } catch (e) {
    yield put(getOneClientFailure(e));
  }
}

function* createClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, clientData } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.createClient,
      token,
      clientData
    );
    const res: AnswerInterface = yield candidate.data;
    console.log(res);
    yield put(createClientSuccess(res));
  } catch (e) {
    yield put(createClientFailure(e));
  }
}

function* clientsSaga() {
  yield all([
    takeEvery("clients/getClientsFetch", getClientsFetchWorker),
    takeEvery("clients/createClientsFetch", createClientsFetchWorker),
  ]);
}

export default clientsSaga;
