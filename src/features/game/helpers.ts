import {
  ColumnNum,
  GamePieceState,
  GameState,
  Player,
  PlayerColor,
} from './game-slice';

export type RowNum = 0 | 1 | 2 | 3 | 4 | 5;
export interface ColumnData {
  lastPosition: RowNum | undefined;
  rows: GamePieceState[];
}

export function createGrid() {
  const grid: ColumnData[] = [];
  for (let i = 0; i < 7; i++) {
    grid.push({
      lastPosition: undefined,
      rows: Array(6).fill({
        selected: false,
        color: undefined,
      } as GamePieceState),
    });
  }
  return grid;
}

export function resetGame(state: GameState, player1: Player, player2: Player) {
  state.gridMap = createGrid();
  state.endGame = false;
  state.gameWinner = undefined;
  state.activePlayer = player1;
  state.player1 = player1;
  state.player2 = player2;
  state.isPaused = false;
  state.isComplete = false;
  state.selectedColumn = 0;
}

export function findWinner(grid: ColumnData[], color: PlayerColor) {
  const COLUMN_COUNT = 7;
  const ROW_COUNT = 6;
  // Check valid horizontal locations for win
  for (let c: ColumnNum = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r: RowNum = 0; r < ROW_COUNT; r++) {
      if (
        grid[c].rows[r].selected &&
        grid[c].rows[r].color === color &&
        grid[c + 1].rows[r].selected &&
        grid[c + 1].rows[r].color === color &&
        grid[c + 2].rows[r].selected &&
        grid[c + 2].rows[r].color === color &&
        grid[c + 3].rows[r].selected &&
        grid[c + 3].rows[r].color === color
      ) {
        grid[c].rows[r].highlight = true;
        grid[c + 1].rows[r].highlight = true;
        grid[c + 2].rows[r].highlight = true;
        grid[c + 3].rows[r].highlight = true;
        return true;
      }
    }
  }

  // Check valid vertical locations for win
  for (let c: ColumnNum = 0; c < COLUMN_COUNT; c++) {
    for (let r: RowNum = 0; r < ROW_COUNT - 3; r++) {
      if (
        grid[c].rows[r].selected &&
        grid[c].rows[r].color === color &&
        grid[c].rows[r + 1].selected &&
        grid[c].rows[r + 1].color === color &&
        grid[c].rows[r + 2].selected &&
        grid[c].rows[r + 2].color === color &&
        grid[c].rows[r + 3].selected &&
        grid[c].rows[r + 3].color === color
      ) {
        grid[c].rows[r].highlight = true;
        grid[c].rows[r + 1].highlight = true;
        grid[c].rows[r + 2].highlight = true;
        grid[c].rows[r + 3].highlight = true;
        return true;
      }
    }
  }

  // Check valid positive diagonal locations for win
  for (let c: ColumnNum = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r: RowNum = 0; r < ROW_COUNT - 3; r++) {
      if (
        grid[c].rows[r].selected &&
        grid[c].rows[r].color === color &&
        grid[c + 1].rows[r + 1].selected &&
        grid[c + 1].rows[r + 1].color === color &&
        grid[c + 2].rows[r + 2].selected &&
        grid[c + 2].rows[r + 2].color === color &&
        grid[c + 3].rows[r + 3].selected &&
        grid[c + 3].rows[r + 3].color === color
      ) {
        grid[c].rows[r].highlight = true;
        grid[c + 1].rows[r + 1].highlight = true;
        grid[c + 2].rows[r + 2].highlight = true;
        grid[c + 3].rows[r + 3].highlight = true;
        return true;
      }
    }
  }

  // check valid negative diagonal locations for win
  for (let c: ColumnNum = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r: RowNum = 3; r < ROW_COUNT; r++) {
      if (
        grid[c].rows[r].selected &&
        grid[c].rows[r].color === color &&
        grid[c + 1].rows[r - 1].selected &&
        grid[c + 1].rows[r - 1].color === color &&
        grid[c + 2].rows[r - 2].selected &&
        grid[c + 2].rows[r - 2].color === color &&
        grid[c + 3].rows[r - 3].selected &&
        grid[c + 3].rows[r - 3].color === color
      ) {
        grid[c].rows[r].highlight = true;
        grid[c + 1].rows[r - 1].highlight = true;
        grid[c + 2].rows[r - 2].highlight = true;
        grid[c + 3].rows[r - 3].highlight = true;
        return true;
      }
    }
  }
  return false;
}
