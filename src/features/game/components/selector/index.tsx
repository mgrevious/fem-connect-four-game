import React, { useEffect } from 'react';
import {
  ColumnNum,
  PlayerColor,
  checkForGameWinner,
  toggleActivePlayer,
} from '../../game-slice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectColumn, selectGridPosition } from '../../game-slice';
import MarkerRedSvg from '../../../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../../../assets/images/marker-yellow.svg';

const Selector: React.FC = () => {
  const { activePlayer, selectedColumn, endGame, gridMap } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const gridColumns: ColumnNum[] = [0, 1, 2, 3, 4, 5, 6];

  let markerSrc = MarkerRedSvg;
  if (activePlayer.color === PlayerColor.YELLOW) {
    markerSrc = MarkerYellowSvg;
  }

  useEffect(() => {
    dispatch(checkForGameWinner());
  }, [gridMap, dispatch]);

  return (
    <div className="absolute -top-11 left-0 right-0 h-[43px] w-full flex justify-center">
      <div className="h-[43px] w-[632px] px-[17px] flex items-center justify-between">
        {gridColumns.map((column, index) => {
          if (selectedColumn === column) {
            return (
              <div id="" key={index} className="flex justify-center w-[71px]">
                <button
                  disabled={
                    endGame || gridMap[selectedColumn].lastPosition === 0
                  }
                  onClick={() => {
                    dispatch(toggleActivePlayer());
                    dispatch(selectGridPosition(column));
                  }}
                >
                  <img src={markerSrc} alt="Marker" />
                </button>
              </div>
            );
          }
          return (
            <div
              id=""
              key={index}
              className={`flex justify-center w-[71px] opacity-0 ${
                endGame ? 'cursor-default' : 'hover:opacity-100'
              }`}
            >
              <button
                disabled={endGame}
                onClick={() => {
                  dispatch(toggleActivePlayer());
                  dispatch(selectColumn(column));
                  dispatch(selectGridPosition(column));
                }}
              >
                <img src={markerSrc} alt="Marker" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selector;
