import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClientReduxState {
  id: string;
  telephone: string;
  authCode: string;
  createdAt: string;
  updatedAt: string;
  messageTokens: number;
}

export const initialStateClientReduxState: ClientReduxState = {
  authCode: '',
  createdAt: '',
  id: '',
  messageTokens: 0,
  telephone: '',
  updatedAt: ''
};

export const clientSlice = createSlice({
  name: 'client',
  initialState: initialStateClientReduxState,
  reducers: {
    setClient: (state, action: PayloadAction<ClientReduxState>) => {
      return action.payload;
    },
  },
});

export const { setClient } = clientSlice.actions;
export default clientSlice.reducer;
