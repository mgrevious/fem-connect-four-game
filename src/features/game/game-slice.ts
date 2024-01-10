import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  PLAYER_ONE,
  PLAYER_TWO,
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

type ColumnState = {
  rows: Map<RowId, GamePieceState>;
  highestRowPosition?: RowId;
};

const getGridMap = () => {
  const gridRows: RowId[] = ['1', '2', '3', '4', '5', '6'];
  const gridMap = new Map<ColumnId, ColumnState>();

  for (const col of gridColumns) {
    const rowMap = new Map<RowId, GamePieceState>();
    for (const row of gridRows) {
      rowMap.set(row, { selected: false });
    }
    gridMap.set(col, { rows: rowMap });
  }

  return gridMap;
};

export interface GameState {
  player1: Player;
  player2: Player;
  activePlayer: Player;
  gameWinner?: PlayerName;
  isComplete: boolean;
  isPaused: boolean;
  isRestarted: boolean;
  endGame: boolean;
  gameStarted?: boolean;
  gridMap?: Map<ColumnId, ColumnState> | undefined;
  selectedColumn: ColumnId;
}

const activePlayer: Player = {
  name: PlayerName.PLAYER_ONE,
  currentScore: 0,
  type: PlayerType.HUMAN,
  color: PlayerColor.RED,
};

const initialState: GameState = {
  player1: activePlayer,
  player2: {
    name: PlayerName.PLAYER_TWO,
    currentScore: 0,
    type: PlayerType.HUMAN,
    color: PlayerColor.YELLOW,
  },
  activePlayer,
  gameStarted: false,
  endGame: false,
  isComplete: false,
  isPaused: false,
  isRestarted: false,
  selectedColumn: 'a',
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
      state.gameStarted = true;
    },
    toggleActivePlayer(state) {
      if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
        state.activePlayer = state.player2;
      } else {
        state.activePlayer = state.player1;
      }
    },
    selectGridPosition(
      state,
      action: PayloadAction<{
        columnId: ColumnId;
      }>
    ) {
      // debugger;
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
            color: state.activePlayer.color,
          });
        } else if (rowAsNum > 1) {
          const newPosition = `${rowAsNum - 1}` as RowId;
          column.rows.set(newPosition, {
            selected: true,
            color: state.activePlayer.color,
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
    selectGameWinner(state) {
      if (state.activePlayer.name === PlayerName.PLAYER_ONE) {
        state.player2.currentScore = (state.player2.currentScore + 1) as Score;
      } else {
        state.player1.currentScore = (state.player1.currentScore + 1) as Score;
      }
    },
    checkForGameWinner(state) {
      if (state.gridMap) {
        // const result = analyzeGrid(gridMap, player1, player2);
      } else if (
        state.player1.currentScore >= 50 ||
        state.player2.currentScore >= 50
      ) {
        state.endGame = true;
      }
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const {
  checkForGameWinner,
  toggleActivePlayer,
  startGame,
  updateGameResults,
  selectGameWinner,
  selectColumn,
  selectGridPosition,
} = gameSlice.actions;
