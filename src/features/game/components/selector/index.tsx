import React, { useEffect, useRef } from 'react';
import {
  ColumnNum,
  PlayerColor,
  checkForGameWinner,
  setIsColumnSelected,
} from '../../game-slice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectColumn, selectGridPosition } from '../../game-slice';
import MarkerRedSvg from '../../../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../../../assets/images/marker-yellow.svg';

import styles from '../../game.module.css';

interface Props {
  setAnimationComplete: (value: boolean) => void;
}

const Selector: React.FC<Props> = ({ setAnimationComplete }) => {
  const gamePieceEl = useRef<HTMLDivElement | null>(null);
  const { activePlayer, selectedColumn, endGame, gridMap, isColumnSelected } =
    useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const gridColumns: ColumnNum[] = [0, 1, 2, 3, 4, 5, 6];

  const gamePieceAnimation = useRef<Animation | null>(null);

  // if (gamePieceAnimation) {
  //   gamePieceAnimation.onfinish = () => {
  //     debugger;
  //     setAnimationComplete();
  //   };
  // }

  useEffect(() => {
    let animation = gamePieceAnimation.current;
    animation = new Animation(
      new KeyframeEffect(
        gamePieceEl.current,
        [
          {
            top: '80px',
          },
          { top: '508px' },
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
          fill: 'forwards',
        }
      )
    );
    if (animation && isColumnSelected) {
      animation.play();
      animation.onfinish = () => {
        // gamePieceEl.current?.className
        // debugger;
        dispatch(setIsColumnSelected(false));
        setAnimationComplete(true);
      };
    }
  }, [isColumnSelected, setAnimationComplete, dispatch]);

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
              <div
                id=""
                key={index}
                className="flex justify-center w-[71px] relative"
              >
                <div
                  ref={gamePieceEl}
                  className={`${styles.gamePiece} ${
                    activePlayer.color === PlayerColor.RED
                      ? styles.yellow
                      : styles.red
                  } w-[71px] h-[75px] flex items-center justify-center mb-[17px] ${
                    isColumnSelected ? 'visible' : 'invisible'
                  } absolute left-0 top-10`}
                ></div>
                <button
                  disabled={
                    endGame || gridMap[selectedColumn].lastPosition === 0
                  }
                  onClick={() => {
                    setAnimationComplete(false);
                    dispatch(selectGridPosition(column));
                    dispatch(checkForGameWinner());
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
                  setAnimationComplete(false);
                  dispatch(selectColumn(column));
                  dispatch(selectGridPosition(column));
                  dispatch(checkForGameWinner());
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
