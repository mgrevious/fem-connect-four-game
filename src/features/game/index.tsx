import { CreateArrayWithLengthX, NumericRange } from '../../utils/number-range';

export type Score = NumericRange<CreateArrayWithLengthX<0>, 50>;

export type Player = {
  id: string;
  currentScore: Score;
  name: string;
};

export interface Scoreboard {
  player1: Player;
  player2: Player;
  currentPlayer: string;
  currentWinner: string;
}

export interface Game {
  scoreboard: Scoreboard;
}
