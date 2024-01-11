import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Display from './display';
import Selector from './selector';
import Rows from './Rows';

import styles from '../game.module.css';
import { ColumnNum } from '../game-slice';

const Grid = () => {
  const [counter, setCounter] = useState(0);
  const { gameWinner, gridMap } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (counter < 3) {
      const updatedCounter = counter + 1;
      setCounter(updatedCounter);
    }
  }, [counter]);

  const rowClass = 'flex flex-col w-[71px] mr-[17px] opacity-80';

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className={`${styles.gridBack} relative`}>
          <div className="flex p-[17px]">
            {gridMap.map((column, index) => (
              <div key={index} className={rowClass}>
                <Rows data={column.rows} columnIndex={index as ColumnNum} />
              </div>
            ))}
          </div>
          <div
            className={`${styles.gridFront} flex absolute top-0 left-0 right-0 p-[17px]`}
          />
          <Display showWinner={gameWinner !== undefined} />
          <Selector />
        </div>
      </div>
    </div>
  );
};

export default Grid;
