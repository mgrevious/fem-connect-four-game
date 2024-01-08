import { Player, PlayerColor } from '../../game-slice';

export function getColor(
  gameStarted: boolean | undefined,
  activePlayer: Player
): PlayerColor {
  if (gameStarted) {
    return activePlayer.color === PlayerColor.RED
      ? PlayerColor.YELLOW
      : PlayerColor.RED;
  } else {
    return activePlayer.color;
  }
}
