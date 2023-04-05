import { createSlice } from '@reduxjs/toolkit';
import zones from '../../data/zones.json';
import { Zone } from '../../models/zone';
import { ZoneCollection } from '../../models/zoneCollection';


import type { PayloadAction } from '@reduxjs/toolkit';

interface ZoneState {
  data: ZoneCollection;
  selectedZones: Zone[];
}

const initialState = {
  data: new ZoneCollection(zones),
  selectedZones: [] as Zone[],
} as ZoneState;

export const zoneSlice = createSlice({
  name: 'zoneData',
  initialState: initialState,
  reducers: {
    addZone: (state, action: PayloadAction<Zone>) => {
      state.selectedZones.push(action.payload);
    },
  },
});

export const { addZone } = zoneSlice.actions;
