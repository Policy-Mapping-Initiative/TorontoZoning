import { createSlice } from '@reduxjs/toolkit';
import NEIGH from '../../data/Neighbourhoods.json';
import { NeighbourhoodData } from '../../interfaces/neighbourhood';
import { NeighbourhoodCollection } from '../../models/neighbourhood';

interface NeighbourhoodState {
  data: NeighbourhoodCollection;
}

const initialState = {
  data: new NeighbourhoodCollection((NEIGH as NeighbourhoodData).features.slice(0, 300)),
} as NeighbourhoodState;

export const neighbourSlice = createSlice({
  name: 'neighbourhoodData',
  initialState: initialState,
  reducers: {},
});
