import { AxiosResponse } from "axios";
import { call, put, takeEvery, all } from "redux-saga/effects";
import { Client } from "../api/client";
import { ClientDataInterface } from "../interfaces/client.interface";
import { AnswerInterface } from "../interfaces/common.interface";
import { exportClientsToExcel } from "../helpers/excelExport";
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
  downloadClientsSuccess,
  downloadClientsFailure,
} from "../store/clientsStore";

function* getClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token } = action.payload;
    const res: AxiosResponse<ClientDataInterface[]> = yield call(
      api.getAllClients.bind(api),
      token
    );
    const clientsData = res.data;
    yield put(getClientsSuccess(clientsData));
  } catch (e) {
    yield put(getClientsFailure(e));
  }
}

function* getOneClientFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, id } = action.payload;
    const res: AxiosResponse<ClientDataInterface> = yield call(
      api.getOneClient.bind(api),
      token,
      id
    );
    const clientsData = res.data;
    yield put(getOneClientSuccess(clientsData));
  } catch (e) {
    yield put(getOneClientFailure(e));
  }
}

function* createClientsFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, data: clientData } = action.payload;
    const candidate: AxiosResponse<AnswerInterface> = yield call(
      api.createClient.bind(api),
      token,
      clientData
    );
    const raw = candidate.data as unknown as
      | { data: ClientDataInterface }
      | ClientDataInterface;
    const createdClient =
      raw && typeof raw === "object" && "data" in raw && raw.data
        ? raw.data
        : (raw as ClientDataInterface);
    yield put(createClientSuccess({ data: createdClient }));
    yield put(getClientsFetch({ token }));
  } catch (e) {
    yield put(createClientFailure(e));
  }
}

function* updateClientFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, clientId, clientData } = action.payload;
    const candidate: AxiosResponse<AnswerInterface> = yield call(
      api.updateClient.bind(api),
      token,
      clientId,
      clientData
    );
    const res = candidate.data;
    yield put(updateClientSuccess({ ...res, ...clientData }));
  } catch (error) {
    yield put(updateClientFailure(error));
  }
}

function* deleteClientFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, id } = action.payload;
    const candidate: AxiosResponse<AnswerInterface> = yield call(
      api.deleteClient.bind(api),
      token,
      id
    );
    const res = candidate.data;
    yield put(deleteClientSuccess({ ...res, id }));
    yield put(getClientsFetch({ token }));
  } catch (error) {
    yield put(deleteClientFailure(error));
  }
}

function* acceptRequestFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, clientId, clientData } = action.payload;
    const candidate: AxiosResponse<AnswerInterface> = yield call(
      api.acceptRequest.bind(api),
      token,
      clientId
    );
    const res = candidate.data;
    yield put(updateClientSuccess({ ...res, ...clientData }));
  } catch (error) {
    yield put(updateClientFailure(error));
  }
}

function* rejectRequestFetchWorker(action: { payload: any; type: string }) {
  try {
    const api = new Client();
    const { token, id } = action.payload;
    const candidate: AxiosResponse<AnswerInterface> = yield call(
      api.rejectRequest.bind(api),
      token,
      id
    );
    const res = candidate.data;
    yield put(deleteClientSuccess({ ...res, id }));
    yield put(getClientsFetch({ token }));
  } catch (error) {
    yield put(deleteClientFailure(error));
  }
}

function* downloadClientsFetchWorker(action: {
  type: string;
  payload: { token: string };
}) {
  try {
    const api = new Client();
    const { token } = action.payload;
    const res: AxiosResponse<ClientDataInterface[]> = yield call(
      api.downloadClients.bind(api),
      token
    );
    exportClientsToExcel(res.data);
    yield put(downloadClientsSuccess({ message: "Файл загружен" }));
  } catch (error) {
    yield put(downloadClientsFailure(error));
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
    takeEvery("clients/downloadClientsFetch", downloadClientsFetchWorker),
  ]);
}

export default clientsSaga;
