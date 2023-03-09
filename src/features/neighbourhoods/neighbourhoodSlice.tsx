import { createSlice } from '@reduxjs/toolkit';
import neighbourhoodData from '../../data/neighbourhoods.json';
import { NeighbourhoodCollection } from '../../models/neighbourhoodCollection';

interface NeighbourhoodState {
  data: NeighbourhoodCollection;
}

const initialState = {
  data: new NeighbourhoodCollection(neighbourhoodData)
}

export const neighbourSlice = createSlice({
  name: 'neighbourhoodData',
  initialState: initialState,
  reducers: {},
});
