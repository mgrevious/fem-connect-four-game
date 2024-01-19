import { useAppSelector } from '../../../app/hooks';
import { ColumnNum, GamePieceState } from '../game.types';
import { PlayerColor } from '../helpers';

import styles from '../game.module.css';
import { MutableRefObject } from 'react';

interface Props {
  columnIndex: ColumnNum;
  data: GamePieceState[];
  showGamePiece: boolean;
  dropPiece: MutableRefObject<HTMLDivElement | null>;
}

const otherClasses =
  'mt-1 lg:m-0 w-[42px] sm:w-[72px] flex items-center justify-center opacity-100 relative';
const gameWinnerDiv = (
  <div className="w-[20px] h-[20px] sm:w-[34px] sm:h-[34px] border-[6px] border-white absolute top-[6px] left-[11px] sm:top-[18px] sm:left-[18px] rounded-full"></div>
);

const Row: React.FC<Props> = ({
  data,
  columnIndex,
  showGamePiece,
  dropPiece,
}) => {
  const { gameWinner } = useAppSelector((state) => state.game);

  return data.map((gamePieceState, index) => {
    if (gamePieceState?.active) {
      return (
        <div
          ref={dropPiece}
          id={`gamepiece_${columnIndex}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${
            gamePieceState.color === PlayerColor.RED
              ? styles.red
              : styles.yellow
          } ${otherClasses} ${
            showGamePiece ? `visible ${styles.bounce}` : 'invisible'
          } h-[40px] sm:h-[73px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight
            ? gameWinnerDiv
            : null}
        </div>
      );
    } else if (gamePieceState?.selected) {
      return (
        <div
          id={`${columnIndex}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${
            gamePieceState.color === PlayerColor.RED
              ? styles.red
              : styles.yellow
          } ${otherClasses} opacity-100 h-[40px] sm:h-[73px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight
            ? gameWinnerDiv
            : null}
        </div>
      );
    }
    return (
      <div
        id={`${columnIndex}${index + 1}`}
        key={index}
        className={`${styles.gamePiece} ${otherClasses} h-[44px] sm:h-[71px]`}
      ></div>
    );
  });
};

export default Row;
