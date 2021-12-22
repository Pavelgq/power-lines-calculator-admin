import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminStore';
import clientsReducer from './clientsStore';
import createSagaMiddleware from 'redux-saga';
import clientsSaga from '../sagas/clientsSaga';
import adminSaga from '../sagas/adminSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    clients: clientsReducer,
  },
  middleware: [saga]
});

saga.run(adminSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
