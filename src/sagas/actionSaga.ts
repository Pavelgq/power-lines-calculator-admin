import { AxiosResponseHeaders } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { Action } from "../api/action";
import { ActionFullInterface } from "../interfaces/action.interface";
import { ClientDataInterface } from "../interfaces/client.interface";
import {
  createActionFailure,
  createActionSuccess,
  getActionFileFailure,
  getActionFileSuccess,
  getAllActionsFailure,
  getAllActionsSuccess,
  getClientActionsFailure,
  getClientActionsSuccess,
} from "../store/actionStore";

function* createActionWorker(action: { payload: any; type: string }) {
  try {
    const clientAction = new Action();
    const { acceptToken, data } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      clientAction.createActionForClient,
      acceptToken,
      data
    );
    console.log("createActionForClient", res);
    const clientsData: ClientDataInterface[] = yield res.data;
    yield put(createActionSuccess());
  } catch (error) {
    yield put(createActionFailure(error));
  }
}

function* getAllActionsWorker(action: { payload: any; type: string }) {
  try {
    const clientAction = new Action();
    const { token } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      clientAction.getAllActions,
      token
    );
    console.log("getAllActions", res);
    const actionData: ActionFullInterface[] = yield res.data;
    yield put(getAllActionsSuccess(actionData));
  } catch (error) {
    yield put(getAllActionsFailure(error));
  }
}

function* getClientActionsWorker(action: { payload: any; type: string }) {
  try {
    const clientAction = new Action();
    const { token, clientId } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      clientAction.getActionsForClient,
      token,
      clientId
    );
    console.log("getClientActions", res);
    const actionsData: ActionFullInterface = yield res.data;
    yield put(getClientActionsSuccess(actionsData));
  } catch (error) {
    yield put(getClientActionsFailure(error));
  }
}

function* getActionFileWorker(action: { payload: any; type: string }) {
  try {
    const clientAction = new Action();
    const { fileId } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      clientAction.getActionFile,
      fileId
    );
    console.log("getClientActions", res);
    // TODO: Как это сделать?
    yield put(getActionFileSuccess());
  } catch (error) {
    yield put(getActionFileFailure(error));
  }
}

function* actionSaga() {
  yield all([
    takeEvery("actions/createAction", createActionWorker),
    takeEvery("actions/getAllActions", getAllActionsWorker),
    takeEvery("actions/getClientActions", getClientActionsWorker),
    takeEvery("actions/getActionFile", getActionFileWorker),
  ]);
}

export default actionSaga;
