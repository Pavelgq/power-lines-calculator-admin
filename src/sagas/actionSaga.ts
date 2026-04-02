import { AxiosResponse } from "axios";
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
import {
  downloadActionFileBlob,
  exportActionsToExcel,
} from "../helpers/excelExport";

function normalizeClientActionsPayload(
  data: unknown
): ActionFullInterface[] {
  if (Array.isArray(data)) {
    return data as ActionFullInterface[];
  }
  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: ActionFullInterface[] }).data;
  }
  if (data && typeof data === "object" && "id" in (data as object)) {
    return [data as ActionFullInterface];
  }
  return [];
}

function* createActionWorker(action: {
  payload: { data: ActionCreateInterface; acceptToken: string };
  type: string;
}) {
  try {
    const api = new Action();
    const { acceptToken, data } = action.payload;
    const res: AxiosResponse<{
      data: ActionFullInterface;
      message: string;
    }> = yield call(
      api.createActionForClient.bind(api),
      acceptToken,
      data
    );
    yield put(createClientActionSuccess(res.data));
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
      dir: "ASC" | "DESC" | "asc" | "desc";
    };
    period: string;
  };
  type: string;
}) {
  try {
    yield delay(500);
    const api = new Action();
    const { token, page, limit, filters, sort, period } = action.payload;
    const sortForApi = {
      field: sort.field,
      dir: String(sort.dir).toUpperCase() as "ASC" | "DESC",
    };
    const periodForApi = period as
      | "all"
      | "day"
      | "week"
      | "month"
      | "quarter"
      | "year";
    const res: AxiosResponse<unknown> = yield call(
      api.getAllActions.bind(api),
      token,
      sortForApi,
      periodForApi,
      page ?? 1,
      limit ?? 5,
      filters
    );
    const body = res.data as
      | ActionFullInterface[]
      | { data: ActionFullInterface[]; total_items?: number; total?: number };
    const normalized =
      Array.isArray(body)
        ? { data: body, total_items: body.length }
        : {
            data: body?.data ?? [],
            total_items: Number(
              body?.total_items ?? (body as { total?: number })?.total ?? 0
            ),
          };
    yield put(getAllActionsSuccess(normalized));
  } catch (error) {
    yield put(getAllActionsFailure(error));
  }
}

function* getClientActionsWorker(action: { payload: any; type: string }) {
  try {
    const api = new Action();
    const { token, clientId } = action.payload;
    const res: AxiosResponse<unknown> = yield call(
      api.getActionsForClient.bind(api),
      token,
      clientId
    );
    const actionsList = normalizeClientActionsPayload(res.data);
    yield put(getClientActionsSuccess(actionsList));
  } catch (error) {
    yield put(getClientActionsFailure(error));
  }
}

function* getActionFileWorker(action: {
  type: string;
  payload: { path: string };
}) {
  try {
    const api = new Action();
    const { path } = action.payload;
    const res: AxiosResponse<unknown> = yield call(
      api.getActionFile.bind(api),
      path
    );
    downloadActionFileBlob(res.data, path);
    yield put(getActionFileSuccess());
  } catch (error) {
    yield put(getActionFileFailure(error));
  }
}

function* downloadActionsFetchWorker(action: {
  type: string;
  payload: { token: string; programType: number };
}) {
  try {
    const api = new Action();
    const { token, programType } = action.payload;
    const res: AxiosResponse<
      (ActionFullInterface & {
        first_name: string;
        last_name: string;
        company: string;
      })[]
    > = yield call(
      api.downloadActions.bind(api),
      token,
      String(programType)
    );
    exportActionsToExcel(res.data, programType);
    yield put(downloadActionsSuccess({ message: "Файл загружен" }));
  } catch (error) {
    yield put(downloadActionsFailure(error));
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
