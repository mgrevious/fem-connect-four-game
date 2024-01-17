import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import {
  checkForGameWinner,
  setIsColumnSelected,
  selectColumn,
  selectGridPosition,
} from '../game-slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import MarkerRedSvg from '../../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../../assets/images/marker-yellow.svg';
import { PlayerColor } from '../helpers';
import { ColumnNum } from '../game.types';

import styles from '../game.module.css';

interface Props {
  setAnimationComplete: (value: boolean) => void;
}

const gridColumns: ColumnNum[] = [0, 1, 2, 3, 4, 5, 6];
const gamePieceOffsets = [17, 105, 193, 281, 369, 457];

const Selector: React.FC<Props> = ({ setAnimationComplete }) => {
  const gamePieceEl = useRef<HTMLDivElement | null>(null);
  const {
    activePlayer,
    selectedColumn,
    endGame,
    gridMap,
    isColumnSelected,
    highestPositionList,
  } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const gamePieceAnimation = useRef<Animation | null>(null);
  const getAnimationOffset = useCallback(() => {
    const rowNum = highestPositionList[selectedColumn];
    return rowNum !== undefined ? gamePieceOffsets[rowNum] : 508;
  }, [highestPositionList, selectedColumn]);

  useEffect(() => {
    const rowNum = highestPositionList[selectedColumn];
    let animation = gamePieceAnimation.current;
    animation = new Animation(
      new KeyframeEffect(
        gamePieceEl.current,
        [
          {
            top: '60px',
          },
          {
            top: `${getAnimationOffset()}px`,
          },
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
        }
      )
    );

    if (animation && isColumnSelected && rowNum !== undefined && rowNum > 0) {
      animation.play();
      animation.onfinish = () => {
        dispatch(setIsColumnSelected(false));
        setAnimationComplete(true);
        setTimeout(() => {
          dispatch(checkForGameWinner());
        }, 200);
      };
    } else if (rowNum !== undefined && rowNum === 0) {
      // no animation for gamepiece at row 0
      dispatch(setIsColumnSelected(false));
      setAnimationComplete(true);
      setTimeout(() => {
        dispatch(checkForGameWinner());
      }, 200);
    }
  }, [
    isColumnSelected,
    setAnimationComplete,
    dispatch,
    getAnimationOffset,
    highestPositionList,
    selectedColumn,
  ]);

  let markerSrc = MarkerRedSvg;
  if (activePlayer.color === PlayerColor.YELLOW) {
    markerSrc = MarkerYellowSvg;
  }

  return (
    <div className="absolute -top-11 left-0 right-0 h-[43px] w-full flex justify-center">
      <div className="h-[43px] lg:w-[632px] px-[17px] flex items-center justify-between">
        {gridColumns.map((column, index) => {
          if (selectedColumn === column) {
            return (
              <div
                id=""
                key={index}
                className="opacity-0 lg:opacity-100 flex justify-center w-[42px] lg:w-[71px] relative"
              >
                <div
                  ref={gamePieceEl}
                  className={`${styles.gamePiece} ${
                    activePlayer.color === PlayerColor.RED
                      ? styles.red
                      : styles.yellow
                  } w-[42px] h-[44px] lg:w-[71px] lg:h-[71px] flex items-center justify-center mb-[17px] ${
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
                    // dispatch(checkForGameWinner());
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
              className={`flex justify-center w-[42px] lg:w-[71px] opacity-0 ${
                endGame ? 'cursor-default' : 'hover:opacity-100'
              }`}
            >
              <button
                disabled={endGame}
                onClick={() => {
                  setAnimationComplete(false);
                  dispatch(selectColumn(column));
                  dispatch(selectGridPosition(column));
                  // dispatch(checkForGameWinner());
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
