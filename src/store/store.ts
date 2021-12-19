import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsStore';
import createSagaMiddleware from 'redux-saga';
import clientsSaga from '../sagas/clientsSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
  middleware: [saga]
});

saga.run(clientsSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
