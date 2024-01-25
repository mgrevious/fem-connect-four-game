import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  AppView,
  PlayerColor,
  PlayerName,
  PlayerType,
  RowNum,
  createGrid,
  findWinner,
  resetGame,
} from './helpers';
import { ColumnNum, GameState, Player, Score } from './game.types';

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

export const REMAINING_TIME = 30 * 1000;

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
  remainingTime: REMAINING_TIME,
  isColumnSelected: false,
  highestPositionList: new Array(7).fill(undefined),
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
      debugger;
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
      state.isColumnSelected = true;

      state.gridMap.forEach((el) => {
        el.rows.forEach((gamePieceState) => {
          if (gamePieceState.active) {
            gamePieceState.active = false;
          }
        });
      });

      const activeColumn = state.gridMap[columnNum];
      const lastPosition = activeColumn.lastPosition;

      if (columnNum < state.gridMap.length && columnNum >= 0) {
        if (lastPosition === undefined) {
          activeColumn.rows[5].selected = true;
          activeColumn.rows[5].color = color;
          activeColumn.rows[5].active = true;
          activeColumn.lastPosition = 5;
        } else if (lastPosition && lastPosition > 0) {
          const row = (lastPosition - 1) as RowNum;
          activeColumn.rows[row].selected = true;
          activeColumn.rows[row].color = color;
          activeColumn.rows[row].active = true;
          activeColumn.lastPosition = row;
        }

        state.highestPositionList[columnNum] = (
          lastPosition ? lastPosition - 1 : 5
        ) as RowNum;
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
        // state.timerReset = true;
      }
    },
    continueGame(state) {
      state.endGame = false;
      state.gridMap = createGrid();
      state.timerReset = true;
      if (state.gameWinner !== undefined) {
        if (state.startingPlayer.name === PlayerName.PLAYER_ONE) {
          state.activePlayer = state.player2;
          state.startingPlayer = state.player2;
        } else {
          state.startingPlayer = state.player1;
          state.activePlayer = state.player1;
        }
        state.gameWinner = undefined;
      }
    },
    restartGame(state) {
      resetGame(state, player1, player2);
    },
    setTimerReset(state, action: PayloadAction<boolean>) {
      state.timerReset = action.payload;
    },
    setRemainingTime(state, action: PayloadAction<number>) {
      state.remainingTime = action.payload;
    },
    setIsColumnSelected(state, action: PayloadAction<boolean>) {
      state.isColumnSelected = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const {
  checkForGameWinner,
  continueGame,
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
  setTimerReset,
  setRemainingTime,
  setIsColumnSelected,
} = gameSlice.actions;
