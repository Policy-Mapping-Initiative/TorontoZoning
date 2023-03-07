import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { zoneSlice } from './features/zones/zoneSlice';
import { counterSlice } from './features/counters/counterSlice';

const rootReducer = combineReducers({
  zone: zoneSlice.reducer,
  counter: counterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
