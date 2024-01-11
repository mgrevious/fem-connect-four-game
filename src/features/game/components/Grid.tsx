import { useEffect, useState } from 'react';
import { gridColumns } from '../game-slice';
import { useAppSelector } from '../../../app/hooks';
import Display from './display';
import Selector from './selector';
import Rows from './Rows';

import styles from '../game.module.css';

const Grid = () => {
  const [counter, setCounter] = useState(0);
  const { gameWinner, activePlayer } = useAppSelector((state) => state.game);
  console.log('activePlayer: ', activePlayer);

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
            {gridColumns.map((column, index) => (
              <div key={index} className={rowClass}>
                <Rows column={column} />
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
