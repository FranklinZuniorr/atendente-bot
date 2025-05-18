'use client';

import { Provider } from 'react-redux';
import { storeRedux } from '../store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={storeRedux}>{children}</Provider>;
}
