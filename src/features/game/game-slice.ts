import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateArrayWithLengthX, NumericRange } from '../../utils/number-range';
import {
  ColumnData,
  RowNum,
  createGrid,
  findWinner,
  resetGame,
} from './helpers';

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

export enum AppView {
  GAME,
  MAIN_MENU,
  GAME_RULES,
}

export type Score = NumericRange<CreateArrayWithLengthX<0>, 50>;

export type Player = {
  name: PlayerName;
  color: PlayerColor;
  currentScore: Score;
  type: PlayerType.HUMAN | PlayerType.CPU;
};

export type ColumnNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type GamePieceState = {
  selected: boolean;
  color?: PlayerColor;
  highlight?: boolean;
};
export interface GameState {
  player1: Player;
  player2: Player;
  activePlayer: Player;
  startingPlayer: Player;
  gameWinner?: PlayerName;
  isComplete: boolean;
  isPaused: boolean;
  endGame: boolean;
  gridMap: ColumnData[]; // Map<ColumnId, ColumnState> | undefined;
  selectedColumn: ColumnNum;
  timerReset: boolean;
  currentView: AppView;
}

const player1: Player = {
  name: PlayerName.PLAYER_ONE,
  currentScore: 0,
  type: PlayerType.HUMAN,
  color: PlayerColor.RED,
};

const player2: Player = {
  name: PlayerName.PLAYER_TWO,
  currentScore: 0,
  type: PlayerType.HUMAN,
  color: PlayerColor.YELLOW,
};

const initialState: GameState = {
  player1,
  player2,
  startingPlayer: player1,
  activePlayer: player1,
  endGame: false,
  isComplete: false,
  isPaused: false,
  selectedColumn: 0,
  timerReset: false,
  currentView: AppView.MAIN_MENU,
  gridMap: createGrid(),
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
    startGame(state) {
      resetGame(state, player1, player2);
      state.currentView = AppView.GAME;
    },
    endGame(state) {
      resetGame(state, player1, player2);
      state.currentView = AppView.MAIN_MENU;
    },
    selectAppView(state, action: PayloadAction<AppView>) {
      state.currentView = action.payload;
    },
    pauseGame(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    toggleActivePlayer(state) {
      if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
        state.activePlayer = state.player2;
      } else {
        state.activePlayer = state.player1;
      }
      state.timerReset = true;
    },
    selectGridPosition(state, action: PayloadAction<ColumnNum>) {
      const columnNum = action.payload;
      const color = state.activePlayer.color;

      const selectedColumn = state.gridMap[columnNum];
      const lastPosition = selectedColumn.lastPosition;

      if (columnNum < state.gridMap.length && columnNum >= 0) {
        if (lastPosition === undefined) {
          selectedColumn.rows[5].selected = true;
          selectedColumn.rows[5].color = color;
          selectedColumn.lastPosition = 5;
        } else if (lastPosition && lastPosition > 0) {
          const row = (lastPosition - 1) as RowNum;
          selectedColumn.rows[row].selected = true;
          selectedColumn.rows[row].color = color;
          selectedColumn.lastPosition = row;
        }
      }
    },
    selectColumn(state, action: PayloadAction<ColumnNum>) {
      // use columnId to search gridMap
      // if gridMap key contains column, get available row and set it
      state.selectedColumn = action.payload;
    },
    autoSelectWinner(state) {
      if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
        state.player2.currentScore = (state.player2.currentScore + 1) as Score;
        state.gameWinner = state.player2.name;
      } else {
        state.player1.currentScore = (state.player1.currentScore + 1) as Score;
        state.gameWinner = state.player1.name;
      }
      state.endGame = true;
    },
    checkForGameWinner(state) {
      const winnerFound = findWinner(state.gridMap, state.activePlayer.color);
      if (winnerFound) {
        state.gameWinner = state.activePlayer.name;
        state.endGame = true;
        if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
          state.player1.currentScore = (state.player1.currentScore +
            1) as Score;
        } else {
          state.player2.currentScore = (state.player2.currentScore +
            1) as Score;
        }
      } else {
        if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
          state.activePlayer = state.player2;
        } else {
          state.activePlayer = state.player1;
        }
        state.timerReset = true;
      }
    },
    restartGame(state) {
      state.gameWinner = undefined;
      state.endGame = false;
      state.gridMap = createGrid();
      if (state.startingPlayer.name === PlayerName.PLAYER_ONE) {
        state.activePlayer = state.player2;
        state.startingPlayer = state.player2;
      } else {
        state.startingPlayer = state.player1;
        state.activePlayer = state.player1;
      }
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const {
  checkForGameWinner,
  endGame,
  toggleActivePlayer,
  startGame,
  updateGameResults,
  autoSelectWinner,
  selectColumn,
  selectGridPosition,
  restartGame,
  pauseGame,
  selectAppView,
} = gameSlice.actions;
