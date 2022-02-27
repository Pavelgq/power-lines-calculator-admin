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
  deleteClientSuccess,
  deleteClientFailure,
  getClientsFetch,
  updateClientFailure,
  updateClientSuccess,
} from "../store/clientsStore";

function* getClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    console.log("getClientsFetch", action);
    const client = new Client();
    const { token } = action.payload;
    const res: AxiosResponseHeaders = yield call(client.getAllClients, token);
    console.log("getClientsFetch", res);
    const clientsData: ClientDataInterface[] = yield res.data;
    console.log("getClientsFetch", clientsData);
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
    console.log("getOneClientFetch", res);
    const clientsData: ClientDataInterface = yield res.data;
    console.log("getOneClientFetch", clientsData);
    yield put(getOneClientSuccess(clientsData));
  } catch (e) {
    yield put(getOneClientFailure(e));
  }
}

function* createClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, data: clientData } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.createClient,
      token,
      clientData
    );
    console.log(candidate);
    const res: AnswerInterface = yield candidate.data;
    console.log(res);
    yield put(createClientSuccess(res));
    yield put(getClientsFetch({ token }));
  } catch (e) {
    yield put(createClientFailure(e));
  }
}

function* updateClientFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, clientId, clientData } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.updateClient,
      token,
      clientId,
      clientData
    );
    console.log(candidate);
    const res: AnswerInterface = yield candidate.data;
    console.log(res);
    yield put(updateClientSuccess({ ...res, ...clientData }));
  } catch (error) {
    yield put(updateClientFailure(error));
  }
}

function* deleteClientFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, id } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.deleteClient,
      token,
      id
    );
    console.log(candidate);
    const res: AnswerInterface = yield candidate.data;
    console.log(res);
    yield put(deleteClientSuccess({ ...res, id }));
    yield put(getClientsFetch({ token }));
  } catch (error) {
    yield put(deleteClientFailure(error));
  }
}

function* clientsSaga() {
  yield all([
    takeEvery("clients/getClientsFetch", getClientsFetchWorker),
    takeEvery("clients/createClientsFetch", createClientsFetchWorker),
    takeEvery("clients/updateClientsFetch", updateClientFetchWorker),
    takeEvery("clients/deleteClientFetch", deleteClientFetchWorker),
  ]);
}

export default clientsSaga;
