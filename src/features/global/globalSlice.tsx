import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface GlobalState {
  mapMode: string
}
const initialState = { mapMode: "neighbourhood" } as GlobalState

export const globalSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMapMode(state, action: PayloadAction<string|null>) {
      if  (action.payload !== null) {
        state.mapMode = action.payload
      }  
    },
  },
});

export const { setMapMode } = globalSlice.actions;
