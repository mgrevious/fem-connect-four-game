// import { useAppSelector } from '../../app/hooks';
import styles from './grid.module.css';

let value = 1;

interface Props {
  column: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  selectedRowId?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
}

const Rows: React.FC<Props> = ({ column, selectedRowId }) => {
  value = value + 1;
  console.log(value);
  // const { gridLocationsMap } = useAppSelector((state) => state.game);

  return Array(6)
    .fill('')
    .map((_, index) => (
      <div
        id={`${column}${index + 1}`}
        key={index}
        className={`${
          selectedRowId === index + 1 ? 'opacity-100' : 'opacity-0'
        } ${styles.gamePiece} ${
          styles.redLarge
        } w-[71px] h-[71px] flex items-center justify-center mb-[17px]`}
      ></div>
    ));
};

export default Rows;
