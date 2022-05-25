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
    const { token, data: clientData } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.createClient,
      token,
      clientData
    );
    const res: AnswerInterface = yield candidate.data;
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
    const res: AnswerInterface = yield candidate.data;
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
    const res: AnswerInterface = yield candidate.data;
    yield put(deleteClientSuccess({ ...res, id }));
    yield put(getClientsFetch({ token }));
  } catch (error) {
    yield put(deleteClientFailure(error));
  }
}

function* acceptRequestFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, clientId, clientData} = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.acceptRequest,
      token,
      clientId,
    );
    const res: AnswerInterface = yield candidate.data;
    yield put(updateClientSuccess({ ...res, ...clientData }));
  } catch (error) {
    yield put(updateClientFailure(error));
  }
}

function* rejectRequestFetchWorker(action: { payload: any; type: string }) {
  try {
    const client = new Client();
    const { token, id } = action.payload;
    const candidate: AxiosResponseHeaders = yield call(
      client.rejectRequest,
      token,
      id
    );
    const res: AnswerInterface = yield candidate.data;
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
    takeEvery("clients/acceptRequestFetch", acceptRequestFetchWorker),
    takeEvery("clients/rejectRequestFetch", rejectRequestFetchWorker),
  ]);
}

export default clientsSaga;
