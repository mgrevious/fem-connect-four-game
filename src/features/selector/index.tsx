import React, { useEffect, useState } from 'react';
import MarkerRedSvg from '../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../assets/images/marker-yellow.svg';
import { PlayerName } from '../game/game-slice';
import { useAppSelector } from '../../app/hooks';

const MarkerMap = new Map([
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
  [4, 'd'],
  [5, 'e'],
  [6, 'f'],
  [7, 'g'],
]);

const Selector: React.FC = () => {
  const { currentPosition, activePlayer } = useAppSelector(
    (state) => state.game
  );

  return (
    <div className="absolute top-0 left-0 right-0 h-[43px] w-full flex justify-center">
      <div className="h-[43px] w-[632px] px-[17px] flex items-center justify-between">
        {Array(7)
          .fill('')
          .map((_, index) => (
            <div
              id=""
              key={index}
              className={`${
                MarkerMap.get(index + 1) === currentPosition?.col
                  ? 'opacity-100'
                  : 'opacity-0'
              } flex justify-center w-[71px]`}
            >
              {activePlayer === PlayerName.PLAYER_ONE ? (
                <button onClick={() => {}}>
                  <img src={MarkerRedSvg} alt="Red Marker" />
                </button>
              ) : (
                <button onClick={() => {}}>
                  <img src={MarkerYellowSvg} alt="Yellow Marker" />
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Selector;
