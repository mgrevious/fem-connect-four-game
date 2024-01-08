import React from 'react';
import { PlayerColor, toggleActivePlayer } from '../../game-slice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  gridColumns,
  selectColumn,
  selectGridPosition,
} from '../../game-slice';
import MarkerRedSvg from '../../../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../../../assets/images/marker-yellow.svg';

const Selector: React.FC = () => {
  const { activePlayer, selectedColumn } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  let markerSrc = MarkerRedSvg;
  if (activePlayer.color === PlayerColor.YELLOW) {
    markerSrc = MarkerYellowSvg;
  }

  return (
    <div className="absolute -top-11 left-0 right-0 h-[43px] w-full flex justify-center">
      <div className="h-[43px] w-[632px] px-[17px] flex items-center justify-between">
        {gridColumns.map((column, index) => {
          if (selectedColumn === column) {
            return (
              <div id="" key={index} className="flex justify-center w-[71px]">
                <button
                  onClick={() => {
                    dispatch(toggleActivePlayer());
                    dispatch(
                      selectGridPosition({
                        columnId: column,
                      })
                    );
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
              className="flex justify-center w-[71px] opacity-0"
            >
              <button
                onClick={() => {
                  dispatch(toggleActivePlayer());
                  dispatch(selectColumn(column));
                  dispatch(
                    selectGridPosition({
                      columnId: column,
                    })
                  );
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
