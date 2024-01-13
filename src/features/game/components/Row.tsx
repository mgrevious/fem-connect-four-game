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
  'lg:w-[71px] flex items-center justify-center mb-[17px] opacity-100 relative';

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
          } h-[71px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight ? (
            <div className="w-[34px] h-[34px] border-[6px] border-white absolute top-[18px] left-[18px] rounded-full"></div>
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
          } ${otherClasses} opacity-100 h-[71px]`}
        >
          {gameWinner !== undefined && gamePieceState.highlight ? (
            <div className="w-[34px] h-[34px] border-[6px] border-white absolute top-[18px] left-[18px] rounded-full"></div>
          ) : null}
        </div>
      );
    }
    return (
      <div
        id={`${columnIndex}${index + 1}`}
        key={index}
        className={`${styles.gamePiece} ${otherClasses} h-[71px]`}
      ></div>
    );
  });
};

export default Row;
