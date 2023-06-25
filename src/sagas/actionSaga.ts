import { AxiosResponseHeaders } from "axios";
import {
  all,
  call,
  delay,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { Action } from "../api/action";
import {
  ActionCreateInterface,
  ActionFullInterface,
} from "../interfaces/action.interface";
import { ClientDataInterface } from "../interfaces/client.interface";
import {
  createClientActionFailure,
  createClientActionSuccess,
  downloadActionsFailure,
  downloadActionsSuccess,
  getActionFileFailure,
  getActionFileSuccess,
  getAllActionsFailure,
  getAllActionsSuccess,
  getClientActionsFailure,
  getClientActionsSuccess,
} from "../store/actionStore";

function* createActionWorker(action: {
  payload: { data: ActionCreateInterface; acceptToken: string };
  type: string;
}) {
  try {
    const clientAction = new Action();
    const { acceptToken, data } = action.payload;
    console.log("createActionWorker", acceptToken, data);
    const res: AxiosResponseHeaders = yield call(
      clientAction.createActionForClient,
      acceptToken,
      data
    );
    console.log("createActionForClient", res);
    const newAction: { data: ActionFullInterface; message: string } =
      yield res.data;
    yield put(createClientActionSuccess(newAction));
  } catch (error) {
    yield put(createClientActionFailure(error));
  }
}

function* getAllActionsWorker(action: {
  payload: {
    token: string;
    page?: number;
    limit?: number;
    clientId?: number;
    programType?: number;
    filters: object;
    sort: {
      field: string;
      dir: "ASC" | "DESC";
    };
    period: "all" | "day" | "week" | "month" | "year";
  };
  type: string;
}) {
  try {
    yield delay(500);
    const clientAction = new Action();
    const { token, page, limit, clientId, programType, filters, sort, period } =
      action.payload;
    const type = Number(programType);
    const res: AxiosResponseHeaders = yield call(
      clientAction.getAllActions,
      token,
      sort,
      period,
      page,
      limit,
      filters
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
    const { path } = action.payload;
    const res: AxiosResponseHeaders = yield call(
      clientAction.getActionFile,
      path
    );
    console.log("getClientActions", res, { data: res.data, path });
    // TODO: Как это сделать?
    yield put(getActionFileSuccess({ data: res.data, path }));
  } catch (error) {
    console.log("err", error);
    yield put(getActionFileFailure(error));
  }
}
function* downloadActionsFetchWorker(action: {payload: any; type: string}) {
  try {
    const clientActions = new Action();
    const { token, programType } = action.payload; 
    const res: AxiosResponseHeaders = yield call(
      clientActions.downloadActions,
      token,
      programType,
    );
    yield put(downloadActionsSuccess({ data: res.data, message: 'Файл загружен', programType }));
  } catch (error) {
    yield put(downloadActionsFailure(error))
  }
}

function* actionSaga() {
  yield all([
    takeEvery("actions/createClientAction", createActionWorker),
    takeLatest("actions/getAllActions", getAllActionsWorker),
    takeEvery("actions/getClientActions", getClientActionsWorker),
    takeEvery("actions/getActionFile", getActionFileWorker),
    takeEvery("actions/downloadActionsFetch", downloadActionsFetchWorker),
  ]);
}

export default actionSaga;
