
import { call, put, takeEvery } from 'redux-saga/effects'
import useLocalStorage from '../hooks/useLocalStorage';
import { ClientDataInterface } from '../interfaces/client.interface';
import { getClientsFailure, getClientsSuccess } from '../store/clientsStore';

function* getClientsFetchWorker(action : {
    payload: any;
    type: string;
}) {
  try {
    const clients = yield call(() => fetch('https://hidden-inlet-89012.herokuapp.com/api/v1/user/all', action.payload));
    const formatingClients: ClientDataInterface = yield clients.json();
    yield put(getClientsSuccess(formatingClients));
  } catch(e) {
    yield put(getClientsFailure());
  }
  
}

function* createClientsFetchWorker(action) {
  try {
    const candidate = yield call(() => fetch('https://hidden-inlet-89012.herokuapp.com/api/v1/user/create', action.payload));
    const res = yield candidate.json();
    yield put(createClientSuccess(res));

  } catch (e) {
    yield put(getClientsFailure());
  }
}

function* clientsSaga() {
  yield takeEvery('clients/getClientsFetch', getClientsFetchWorker);
}

export default clientsSaga