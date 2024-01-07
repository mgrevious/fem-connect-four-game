import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateArrayWithLengthX, NumericRange } from '../../utils/number-range';
import { getGridLocationsMap } from './helpers';

export enum PlayerType {
  CPU,
  HUMAN,
}

export enum PlayerColor {
  RED,
  YELLOW,
}

export enum PlayerName {
  PLAYER_ONE,
  PLAYER_TWO,
}

export type Position = {
  row: 1 | 2 | 3 | 4 | 5 | 6;
  col: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
};

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
  activePlayer: PlayerName;
  gameWinner?: PlayerName;
  isComplete: boolean;
  isPaused: boolean;
  isRestarted: boolean;
  currentPosition?: Position;
  gridLocationsMap: Map<string, { selected: boolean }>;
}

const initialState: GameState = {
  player1: {
    name: PlayerName.PLAYER_ONE,
    currentScore: 0,
    type: PlayerType.HUMAN,
    color: PlayerColor.RED,
  },
  player2: {
    name: PlayerName.PLAYER_TWO,
    currentScore: 0,
    type: PlayerType.HUMAN,
    color: PlayerColor.YELLOW,
  },
  activePlayer: PlayerName.PLAYER_ONE,
  currentPosition: { row: 1, col: 'a' },
  isComplete: false,
  isPaused: false,
  isRestarted: false,
  gridLocationsMap: getGridLocationsMap(),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameResults(state, action: PayloadAction<GameState>) {
      const newState = action.payload;
      if (
        newState.gameWinner === PlayerName.PLAYER_ONE &&
        state.player1.currentScore < 50
      ) {
        state.player1.currentScore += 1;
      } else if (
        newState.gameWinner === PlayerName.PLAYER_TWO &&
        state.player2.currentScore < 50
      ) {
        state.player2.currentScore += 1;
      }
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const { updateGameResults } = gameSlice.actions;
