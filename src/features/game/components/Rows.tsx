import { useAppSelector } from '../../../app/hooks';
import { PlayerColor, ColumnNum, GamePieceState } from '../game-slice';
import styles from '../game.module.css';

let value = 1;

interface Props {
  columnIndex: ColumnNum;
  data: GamePieceState[];
}

const Row: React.FC<Props> = ({ data, columnIndex }) => {
  value = value + 1;
  const otherClasses =
    'w-[71px] h-[71px] flex items-center justify-center mb-[17px] opacity-100 relative';
  const { gameWinner, player1, player2 } = useAppSelector(
    (state) => state.game
  );

  return data.map((gamePieceState, index) => {
    if (gamePieceState?.selected) {
      let shouldHighlight = false;
      if (player1.name === gameWinner) {
        shouldHighlight = player1.color === gamePieceState.color;
      } else {
        shouldHighlight = player2.color === gamePieceState.color;
      }
      return (
        <div
          id={`${columnIndex}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${
            gamePieceState.color === PlayerColor.RED
              ? styles.red
              : styles.yellow
          } ${otherClasses} opacity-100`}
        >
          {gameWinner !== undefined && shouldHighlight ? (
            <div className="w-[34px] h-[34px] border-[6px] border-white absolute top-[18px] left-[18px] rounded-full"></div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div
          id={`${columnIndex}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${otherClasses}`}
        ></div>
      );
    }
  });

  // return (
  //   gridMap &&
  //   gridRows.map((rowId, index) => {
  //     const col = gridMap.get(column);
  //     const gamePieceState = col?.rows.get(rowId);
  //     if (gamePieceState?.selected) {
  //       // debugger;
  //       return (
  //         <div
  //           id={`${column}${index + 1}`}
  //           key={index}
  //           className={`${styles.gamePiece} ${
  //             gamePieceState.color === PlayerColor.RED
  //               ? styles.red
  //               : styles.yellow
  //           } ${otherClasses} opacity-100`}
  //         ></div>
  //       );
  //     }

  //     return (
  //       <div
  //         id={`${column}${index + 1}`}
  //         key={index}
  //         className={`${styles.gamePiece} ${otherClasses}`}
  //       ></div>
  //     );
  //   })
  // );
};

export default Row;
