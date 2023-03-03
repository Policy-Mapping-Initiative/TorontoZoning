import { createSlice } from '@reduxjs/toolkit';
import TO from '../../data/ZoningArea.json';
import { ZoneData, FeatureTO } from '../../models/zone';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: TO as ZoneData,
  selectedZones: [] as FeatureTO[],
};

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
