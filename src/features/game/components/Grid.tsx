import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Display from './display';
import Selector from './selector';
import Row from './Row';

import styles from '../game.module.css';
import { ColumnNum } from '../game-slice';

const rowClass = 'flex flex-col w-[71px] mr-[17px] opacity-80';

const Grid = () => {
  const [counter, setCounter] = useState(0);
  const [showSelectedGamePiece, setShowSelectedGamePiece] = useState(false);
  const { gameWinner, gridMap } = useAppSelector((state) => state.game);
  const setAnimationComplete = useCallback((value: boolean) => {
    // debugger;
    setShowSelectedGamePiece(value);
  }, []);

  useEffect(() => {
    if (counter < 3) {
      const updatedCounter = counter + 1;
      setCounter(updatedCounter);
    }
  }, [counter]);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className={`${styles.gridBack} relative`}>
          <Selector setAnimationComplete={setAnimationComplete} />
          <div className="flex p-[17px]">
            {gridMap.map((column, index) => (
              <div key={index} className={rowClass}>
                <Row
                  data={column.rows}
                  columnIndex={index as ColumnNum}
                  showGamePiece={showSelectedGamePiece}
                />
              </div>
            ))}
          </div>
          <div
            className={`${styles.gridFront} flex absolute top-0 left-0 right-0 p-[17px]`}
          />
          <Display showWinner={gameWinner !== undefined} />
        </div>
      </div>
    </div>
  );
};

export default Grid;
