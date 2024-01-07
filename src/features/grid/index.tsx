import { useEffect, useState } from 'react';
import TurnDisplay from '../turn-display';
import Rows from './Rows';

import styles from './grid.module.css';

const Grid = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter < 3) {
      const updatedCounter = counter + 1;
      setCounter(updatedCounter);
    }
  }, [counter]);

  const rowClass = 'flex flex-col w-[71px] mr-[17px] opacity-80';

  return (
    <div className="w-full">
      <div className="flex justify-center items-center min-h-screen">
        <div className={`${styles.gridBack} relative`}>
          <div className="flex p-[17px]">
            <div className={rowClass}>
              <Rows column="a" selectedRowId={1} />
            </div>
            <div className={rowClass}>
              <Rows column="b" />
            </div>
            <div className={rowClass}>
              <Rows column="c" selectedRowId={5} />
            </div>
            <div className={rowClass}>
              <Rows column="d" />
            </div>
            <div className={rowClass}>
              <Rows column="e" />
            </div>
            <div className={rowClass}>
              <Rows column="f" selectedRowId={3} />
            </div>
            <div className={rowClass}>
              <Rows column="f" />
            </div>
          </div>
          <div
            className={`${styles.gridFront} flex absolute top-0 left-0 right-0 p-[17px]`}
          />
          <TurnDisplay />
        </div>
      </div>
    </div>
  );
};

export default Grid;
