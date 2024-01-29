import { useCallback, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import Display from '../Display';
import Selector from '../Selector';
import Row from '../Row';
import { ColumnNum } from '../../game.types';

import styles from './Grid.module.css';

const rowClass =
  'flex flex-col items-center justify-between sm:w-[72px] opacity-80 h-[286px] sm:h-[518px] sm:pt-[10px]';

const Grid = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showSelectedGamePiece, setShowSelectedGamePiece] = useState(false);
  const { gameWinner, gridMap } = useAppSelector((state) => state.game);
  const setAnimationComplete = useCallback((value: boolean) => {
    setShowSelectedGamePiece(value);
  }, []);

  return (
    <div data-testid="grid" className="w-full relative">
      <div className="flex justify-center z-10">
        <div className={`${styles.gridBack} relative`}>
          <Selector setAnimationComplete={setAnimationComplete} />
          <div className="flex justify-between w-full p-2 sm:p-[17px]">
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
            className={`${styles.gridFront} flex absolute top-0 left-0 right-0 sm:p-[17px]`}
          />
          <Display showWinner={gameWinner !== undefined} />
        </div>
      </div>
    </div>
  );
};

export default Grid;
