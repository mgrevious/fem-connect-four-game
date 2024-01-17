import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Display from './display';
import Selector from './Selector';
import Row from './Row';
import { ColumnNum } from '../game.types';

import styles from '../game.module.css';

const rowClass =
  'flex flex-col items-center justify-between lg:w-[72px] opacity-80 h-[286px] lg:h-[518px] lg:pt-[10px]';

const Grid = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0);
  const [showSelectedGamePiece, setShowSelectedGamePiece] = useState(false);
  const { gameWinner, gridMap } = useAppSelector((state) => state.game);
  const setAnimationComplete = useCallback((value: boolean) => {
    setShowSelectedGamePiece(value);
  }, []);

  useEffect(() => {
    if (counter < 3) {
      const updatedCounter = counter + 1;
      setCounter(updatedCounter);
    }
  }, [counter]);
  console.log('ref.current?.offsetTop', ref.current?.offsetTop);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className={`${styles.gridBack} relative`}>
          <Selector setAnimationComplete={setAnimationComplete} />
          <div className="flex justify-between w-full p-2 lg:p-[17px]">
            {gridMap.map((column, index) => (
              <div key={index} className={rowClass}>
                <Row
                  data={column.rows}
                  columnIndex={index as ColumnNum}
                  showGamePiece={showSelectedGamePiece}
                  dropPiece={ref}
                />
              </div>
            ))}
          </div>
          <div
            className={`${styles.gridFront} flex absolute top-0 left-0 right-0 lg:p-[17px]`}
          />
          <Display showWinner={gameWinner !== undefined} />
        </div>
      </div>
    </div>
  );
};

export default Grid;
