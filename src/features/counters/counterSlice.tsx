import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  zoneCount: number;
}
const initialState = { zoneCount: 0 } as CounterState;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementZoneByAmount(state, action: PayloadAction<number>) {
      state.zoneCount += action.payload;
    },
  },
});

export const { incrementZoneByAmount } = counterSlice.actions;
