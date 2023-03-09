import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const getZoneCounter = (state: RootState) => state.counter.zoneCount;
export const getAllZoneData = (state: RootState) => state.zone.data;
export const getSelectedZones = (state: RootState) => state.zone.selectedZones;
export const getNeighbourhoods = (state: RootState) => state.neighbour.data;
export const getMapMode = (state: RootState) => state.global.mapMode;


// https://redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
