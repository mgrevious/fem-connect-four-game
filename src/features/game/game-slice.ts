import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateArrayWithLengthX, NumericRange } from '../../utils/number-range';
import { getGridMap, resetGame } from './helpers';

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

export type RowId = '1' | '2' | '3' | '4' | '5' | '6';

export type ColumnId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export const gridColumns: ColumnId[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
export const gridRows: RowId[] = ['1', '2', '3', '4', '5', '6'];
export type GamePieceState = { selected: boolean; color?: PlayerColor };

export type ColumnState = {
  rows: Map<RowId, GamePieceState>;
  highestRowPosition?: RowId;
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
  gridMap?: Map<ColumnId, ColumnState> | undefined;
  selectedColumn: ColumnId;
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
  selectedColumn: 'a',
  timerReset: false,
  currentView: AppView.MAIN_MENU,
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
    selectGridPosition(
      state,
      action: PayloadAction<{
        columnId: ColumnId;
      }>
    ) {
      const { columnId } = action.payload;
      if (!state.gridMap) {
        state.gridMap = getGridMap();
      }
      const column = state.gridMap.get(columnId);
      if (column) {
        const rowAsNum = Number(column.highestRowPosition);
        if (!column.highestRowPosition) {
          column.highestRowPosition = '6';
          column.rows.set('6', {
            selected: true,
            color:
              state.activePlayer.color === PlayerColor.RED
                ? PlayerColor.YELLOW
                : PlayerColor.RED,
          });
        } else if (rowAsNum > 1) {
          const newPosition = `${rowAsNum - 1}` as RowId;
          column.rows.set(newPosition, {
            selected: true,
            color:
              state.activePlayer.color === PlayerColor.RED
                ? PlayerColor.YELLOW
                : PlayerColor.RED,
          });
          column.highestRowPosition = newPosition;
        }
      }
    },
    selectColumn(state, action: PayloadAction<ColumnId>) {
      // use columnId to search gridMap
      // if gridMap key contains column, get available row and set it
      state.selectedColumn = action.payload;
      // console.log('result', result);
    },
    autoSelectWinner(state) {
      // debugger;
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
      if (state.gridMap) {
        // const result = analyzeGrid(gridMap, player1, player2);
      } else if (
        state.player1.currentScore > 49 ||
        state.player2.currentScore > 49
      ) {
        state.endGame = true;
      }
    },
    restartGame(state) {
      state.gameWinner = undefined;
      state.endGame = false;
      state.gridMap = getGridMap();
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
