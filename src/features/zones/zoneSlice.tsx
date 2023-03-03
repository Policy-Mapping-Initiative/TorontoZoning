import { createSlice } from '@reduxjs/toolkit';
import TO from '../../data/ZoningArea.json';
import { ZoneData, FeatureTO } from '../../interfaces/zone';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ZoneState {
  data: ZoneData;
  selectedZones: FeatureTO[];
}

const initialState = {
  data: TO as ZoneData,
  selectedZones: [] as FeatureTO[],
} as ZoneState;

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    addZone: (state, action: PayloadAction<FeatureTO>) => {
      state.selectedZones.push(action.payload);
    },
  },
});

export const { addZone } = zoneSlice.actions;
