import { all } from "redux-saga/effects";
import adminSaga from "./adminSaga";
import clientsSaga from "./clientsSaga";

function* rootSaga() {
  yield all ([
    adminSaga(),
    clientsSaga(),
  ])
}

export default rootSaga;