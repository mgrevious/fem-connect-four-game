import {
  ColumnId,
  ColumnState,
  GamePieceState,
  GameState,
  Player,
  RowId,
  gridColumns,
} from './game-slice';

const positions = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'e1',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'g1',
  'g2',
  'g3',
  'g4',
  'g5',
  'g6',
] as const;

export type Position = (typeof positions)[number];

export function getGridMap() {
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
}

export function resetGame(state: GameState, player1: Player, player2: Player) {
  state.gridMap = getGridMap();
  state.endGame = false;
  state.gameWinner = undefined;
  state.activePlayer = player1;
  state.player1 = player1;
  state.player2 = player2;
  state.isPaused = false;
  state.isComplete = false;
  state.selectedColumn = 'a';
}

// export function analyzeGrid(gridMap: )
