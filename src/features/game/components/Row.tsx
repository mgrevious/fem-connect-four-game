import { useAppSelector } from '../../../app/hooks';
import { ColumnNum, GamePieceState } from '../game.types';
import { PlayerColor } from '../helpers';

import styles from '../game.module.css';

interface Props {
  columnIndex: ColumnNum;
  data: GamePieceState[];
  showGamePiece: boolean;
}

const otherClasses =
  'mt-1 lg:m-0 w-[42px] lg:w-[71px] flex items-center justify-center opacity-100 relative';

const Row: React.FC<Props> = ({ data, columnIndex, showGamePiece }) => {
  const { gameWinner } = useAppSelector((state) => state.game);

  return data.map((gamePieceState, index) => {
    if (gamePieceState?.active) {
      return (
        <div
          id={`gamepiece_${columnIndex}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${
            gamePieceState.color === PlayerColor.RED
              ? styles.red
              : styles.yellow
          } ${otherClasses} ${
            showGamePiece ? `visible ${styles.bounce}` : 'invisible'
          } h-[40px] lg:h-[73px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight ? (
            <div className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] border-[6px] border-white absolute top-1 left-2 lg:top-[18px] lg:left-[18px] rounded-full"></div>
          ) : null}
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
          } ${otherClasses} opacity-100 h-[40px] lg:h-[73px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight ? (
            <div className="w-[24px] h-[24px] lg:w-[34px] lg:h-[34px] border-[6px] border-white absolute top-1 left-2 lg:top-[18px] lg:left-[18px] rounded-full"></div>
          ) : null}
        </div>
      );
    }
    return (
      <div
        id={`${columnIndex}${index + 1}`}
        key={index}
        className={`${styles.gamePiece} ${otherClasses} h-[44px] lg:h-[71px]`}
      ></div>
    );
  });
};

export default Row;
