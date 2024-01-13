import {
  PlayerName,
  PlayerColor,
  PlayerType,
  AppView,
  RowNum,
} from './helpers';

export type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = []
> = ACC['length'] extends LENGTH
  ? ACC
  : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

export type NumericRange<
  START_ARR extends number[],
  END extends number,
  ACC extends number = never
> = START_ARR['length'] extends END
  ? ACC | END
  : NumericRange<[...START_ARR, 1], END, ACC | START_ARR['length']>;

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
  active: boolean;
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
  remainingTime: number;
  isColumnSelected: boolean;
  highestPositionList: (RowNum | undefined)[];
}

export interface ColumnData {
  lastPosition: RowNum | undefined;
  rows: GamePieceState[];
}
