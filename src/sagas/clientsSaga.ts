
import { call, put, takeEvery, fork } from 'redux-saga/effects'
import { ClientDataInterface } from '../interfaces/client.interface';
import { getClientsFailure, getClientsSuccess, createClientSuccess, createClientFailure } from '../store/clientsStore';

function* getClientsFetchWorker(action : {
    payload: any;
    type: string;
}) {
  try {
    const clients = yield call(() => fetch('https://hidden-inlet-89012.herokuapp.com/api/v1/user/all', action.payload));
    const formatingClients: ClientDataInterface = yield clients.json();
    yield put(getClientsSuccess(formatingClients));
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
  yield takeEvery('clients/getClientsFetch', getClientsFetchWorker);
  yield takeEvery('clients/createClientsFetch', createClientsFetchWorker);

}

export default clientsSaga