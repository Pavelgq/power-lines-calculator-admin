
import { call, put, takeEvery } from 'redux-saga/effects'
import useLocalStorage from '../hooks/useLocalStorage';
import { getClientsFailure, getClientsSuccess } from '../store/clientsStore';

function* workGetClientsFetch(action : {
    payload: any;
    type: string;
}) {
  try {
    const clients = yield call(() => fetch('https://hidden-inlet-89012.herokuapp.com/api/v1/user/all', action.payload));
    const formatingClients = yield clients.json()
    yield put(getClientsSuccess(formatingClients));
  } catch(e) {
    yield put(getClientsFailure());
  }
  
}

function* clientsSaga() {
  yield takeEvery('clients/getClientsFetch', workGetClientsFetch);
}

export default clientsSaga