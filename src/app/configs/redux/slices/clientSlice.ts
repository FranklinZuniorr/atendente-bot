import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ClientReduxState {
  telephone: string;
  authCode: string;
  createdAt: string;
  updatedAt: string;
  messageTokens: number;
}

const initialState: ClientReduxState | null = null;

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state: ClientReduxState | null, action: PayloadAction<ClientReduxState | null>) => {
      state = action.payload;
    },
  },
});

export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;