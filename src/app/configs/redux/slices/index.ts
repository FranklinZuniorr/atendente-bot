import { combineSlices } from '@reduxjs/toolkit';
import { clientSlice } from './clientSlice';

export const rootReducer = combineSlices(clientSlice);