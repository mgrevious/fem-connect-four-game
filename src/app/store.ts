import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { gameReducer } from '../features/game/game-slice';
// import { gridReducer } from '../features/grid/grid-slice';

enableMapSet();

export const store = configureStore({
  reducer: {
    game: gameReducer,
    // grid: gridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
