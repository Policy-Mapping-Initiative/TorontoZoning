import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { zoneSlice } from './features/zones/zoneSlice';
import { counterSlice } from './features/counters/counterSlice';

const rootReducer = combineReducers({
  zone: zoneSlice.reducer,
  counter: counterSlice.reducer,
});
type IRootState = ReturnType<typeof rootReducer>;

export const getZoneCounter = (state: IRootState) => state.counter.zoneCount;
export const getAllZoneData = (state: IRootState) => state.zone.data;
export const getSelectedZones = (state: IRootState) => state.zone.selectedZones;

export const store = configureStore({
  reducer: rootReducer,
});
