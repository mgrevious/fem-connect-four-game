import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as createId } from 'uuid';

import { CreateArrayWithLengthX, NumericRange } from '../../utils/number-range';

export enum PlayerType {
  CPU,
  HUMAN,
}

export enum PlayerColor {
  RED,
  YELLOW,
}

export enum PlayerName {
  ONE,
  TWO,
}

export type Score = NumericRange<CreateArrayWithLengthX<0>, 50>;

export type Player = {
  name: PlayerName;
  color: PlayerColor;
  currentScore: Score;
  type: PlayerType.HUMAN | PlayerType.CPU;
};

export interface GameState {
  player1: Player;
  player2: Player;
  activePlayer?: string | undefined;
  gameWinner?: string | undefined;
  isComplete: boolean;
  isPaused: boolean;
  isRestarted: boolean;
}

const initialState: GameState = {
  player1: {
    name: PlayerName.ONE,
    currentScore: 0,
    type: PlayerType.HUMAN,
    color: PlayerColor.RED,
  },
  player2: {
    name: PlayerName.TWO,
    currentScore: 0,
    type: PlayerType.HUMAN,
    color: PlayerColor.YELLOW,
  },
  isComplete: false,
  isPaused: false,
  isRestarted: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameResults(state, action: PayloadAction<GameState>) {
      const newState = action.payload;
      if (
        newState.gameWinner &&
        newState.gameWinner === state.player1.id &&
        state.player1.currentScore < 50
      ) {
        state.player1.currentScore += 1;
      } else if (
        newState.gameWinner &&
        newState.gameWinner === state.player2.id &&
        state.player2.currentScore < 50
      ) {
        state.player2.currentScore += 1;
      }
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const { updateGameResults } = gameSlice.actions;
