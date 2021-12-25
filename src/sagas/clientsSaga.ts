
import { AxiosResponseHeaders } from 'axios';
import { call, put, takeEvery, fork, all } from 'redux-saga/effects'
import { Client } from '../api/client';
import { ClientDataInterface } from '../interfaces/client.interface';
import { getClientsFailure, getClientsSuccess, createClientSuccess, createClientFailure } from '../store/clientsStore';

function* getClientsFetchWorker(action : {
    payload: any;
    type: string;
}) {
  try {
    console.log('getClientsFetch', action)
    const client = new Client();
    const { token } = action.payload;
    const res: AxiosResponseHeaders = yield call(client.getAllClients, token);
    const clientsData: ClientDataInterface[] = yield res.data;
    yield put(getClientsSuccess(clientsData));
  } catch(e) {
    yield put(getClientsFailure(e));
  }
  
}

function* createClientsFetchWorker(action : {
    payload: any;
    type: string;
}) {
  try {
    const candidate = yield call(() => fetch('https://hidden-inlet-89012.herokuapp.com/api/v1/user/create', action.payload));
    const res = yield candidate.json();
    console.log(res);
    yield put(createClientSuccess(res));

  } catch (e) {
    yield put(getClientsFailure(e));
  }
}

function* clientsSaga() {
  yield all([
    takeEvery('clients/getClientsFetch', getClientsFetchWorker),
    takeEvery('clients/createClientsFetch', createClientsFetchWorker),
  ]);

}

export default clientsSaga