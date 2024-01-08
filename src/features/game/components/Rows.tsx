// import { useAppSelector } from '../../app/hooks';
import { useAppSelector } from '../../../app/hooks';
import { PlayerColor, ColumnId, gridRows } from '../game-slice';
import styles from '../game.module.css';

let value = 1;

interface Props {
  column: ColumnId;
}

const Rows: React.FC<Props> = ({ column }) => {
  value = value + 1;
  // console.log(value);
  const { gridMap } = useAppSelector((state) => state.game);
  const otherClasses =
    'w-[71px] h-[71px] flex items-center justify-center mb-[17px] opacity-100';

  return (
    gridMap &&
    gridRows.map((rowId, index) => {
      const col = gridMap.get(column);
      const gamePieceState = col?.rows.get(rowId);
      if (gamePieceState?.selected) {
        // debugger;
        return (
          <div
            id={`${column}${index + 1}`}
            key={index}
            className={`${styles.gamePiece} ${
              gamePieceState.color === PlayerColor.RED
                ? styles.red
                : styles.yellow
            } ${otherClasses} opacity-100`}
          ></div>
        );
      }

      return (
        <div
          id={`${column}${index + 1}`}
          key={index}
          className={`${styles.gamePiece} ${otherClasses}`}
        ></div>
      );
    })
  );
};

export default Rows;
