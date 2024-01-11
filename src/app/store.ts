import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { gameReducer } from '../features/game/game-slice';

enableMapSet();

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
