import { GamePieceState, GameState, Player } from './game-slice';

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

// export function analyzeGrid(gridMap: )
