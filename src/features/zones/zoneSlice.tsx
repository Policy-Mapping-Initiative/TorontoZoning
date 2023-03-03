import { createSlice } from '@reduxjs/toolkit';
import TO from '../../data/ZoningArea.json';
import { ZoneData, FeatureTO } from '../../models/zone';

const initialState = {
  data: TO as ZoneData,
  selectedZones: [] as FeatureTO[],
};

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    addZone: (state, action) => {
      state.selectedZones.push(action.payload);
    },
  },
});

export const { addZone } = zoneSlice.actions;
