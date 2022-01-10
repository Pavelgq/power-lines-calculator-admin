import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import adminReducer from "./adminStore";
import clientsReducer from "./clientsStore";
import actionReducer from "./actionStore";
import acceptReducer from "./acceptStore";
import rootSaga from "../sagas/rootSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    clients: clientsReducer,
    actions: actionReducer,
    accept: acceptReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
