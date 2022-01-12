import { all } from "redux-saga/effects";
import acceptSaga from "./acceptSaga";
import actionSaga from "./actionSaga";
import adminSaga from "./adminSaga";
import clientsSaga from "./clientsSaga";

function* rootSaga() {
  yield all([adminSaga(), clientsSaga(), actionSaga(), acceptSaga()]);
}

export default rootSaga;
