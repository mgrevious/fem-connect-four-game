import React, { useCallback, useEffect, useRef } from 'react';
import {
  checkForGameWinner,
  setIsColumnSelected,
  selectGridPosition,
  selectColumn,
  setRemainingTime,
  REMAINING_TIME,
} from '../../game-slice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import MarkerRedSvg from '../../../../assets/images/marker-red.svg';
import MarkerYellowSvg from '../../../../assets/images/marker-yellow.svg';
import { AnimatedGamePiece } from './helpers';
import {
  PlayerColor,
  RowNum,
  desktopGamePieceOffsets,
  gridColumns,
  mobileGamePieceOffsets,
} from '../../helpers';

import styles from '../../ConnectFour.module.css';

interface Props {
  setAnimationComplete: (value: boolean) => void;
}

const Selector: React.FC<Props> = ({ setAnimationComplete }) => {
  const dispatch = useAppDispatch();
  const gamePieceEl = useRef<HTMLDivElement | null>(null);
  const documentWidth = useRef<number>(document.body.clientWidth);
  const selectorEl = useRef<HTMLDivElement | null>(null);

  const {
    activePlayer,
    selectedColumn,
    endGame,
    gridMap,
    isColumnSelected,
    highestPositionList,
  } = useAppSelector((state) => state.game);

  const getAnimationOffset = useCallback(() => {
    const rowNum = highestPositionList[selectedColumn];
    let offsets = [];
    let defaultValue = 0;
    if (documentWidth.current < 768) {
      offsets = mobileGamePieceOffsets;
      defaultValue = 300;
    } else {
      offsets = desktopGamePieceOffsets;
      defaultValue = 508;
    }
    return rowNum !== undefined ? offsets[rowNum] : defaultValue;
  }, [highestPositionList, selectedColumn]);

  const handleResize = () => {
    documentWidth.current = document.body.clientWidth;
  };

  useEffect(() => {
    const gamePiece = gamePieceEl.current;
    const onAnimationEnd = () => {
      dispatch(setIsColumnSelected(false));
      setAnimationComplete(true);
      setTimeout(() => {
        dispatch(checkForGameWinner());
        dispatch(setRemainingTime(REMAINING_TIME));
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    if (
      isColumnSelected &&
      highestPositionList[selectedColumn] !== undefined &&
      (highestPositionList[selectedColumn] as RowNum) > 0
    ) {
      gamePiece?.addEventListener('animationend', onAnimationEnd);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      gamePiece?.removeEventListener('animationend', onAnimationEnd);
    };
  }, [
    dispatch,
    setAnimationComplete,
    isColumnSelected,
    highestPositionList,
    selectedColumn,
  ]);

  const selectedRow = useRef(highestPositionList[selectedColumn]);

  useEffect(() => {
    const selectedRowNum = highestPositionList[selectedColumn];

    if (selectedRowNum !== undefined && selectedRowNum === 0) {
      // no animation for gamepiece at row 0
      dispatch(setIsColumnSelected(false));
      setAnimationComplete(true);
      setTimeout(() => {
        dispatch(checkForGameWinner());
        dispatch(setRemainingTime(REMAINING_TIME));
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
    <div
      data-testid="selector"
      ref={selectorEl}
      className="absolute -top-[38px] left-0 right-0 h-[43px] w-full flex justify-center"
    >
      <div className="group h-[43px] w-[327px] sm:w-[632px] sm:px-[17px] flex items-center justify-between">
        {gridColumns.map((column, index) => {
          if (selectedColumn === column) {
            return (
              <div
                key={index}
                className=" flex justify-center w-[42px] sm:w-[71px] relative"
              >
                {isColumnSelected &&
                  highestPositionList[selectedColumn] !== undefined &&
                  (highestPositionList[selectedColumn] as RowNum) > 0 && (
                    <AnimatedGamePiece
                      $offset={getAnimationOffset()}
                      ref={gamePieceEl}
                      className={`${styles.gamePiece} ${
                        activePlayer.color === PlayerColor.RED
                          ? styles.red
                          : styles.yellow
                      } w-[42px] h-[44px] sm:w-[71px] sm:h-[75px] flex items-center justify-center mb-[17px] ${
                        isColumnSelected ? 'visible' : 'invisible'
                      } absolute left-0 top-10`}
                    ></AnimatedGamePiece>
                  )}
                <button
                  data-testid={`selector-btn-${column}`}
                  className={`opacity-0 ${
                    !endGame && gridMap[selectedColumn].lastPosition !== 0
                      ? 'lg:hover:opacity-100'
                      : ''
                  }`}
                  disabled={
                    endGame || gridMap[selectedColumn].lastPosition === 0
                  }
                  onClick={() => {
                    setAnimationComplete(false);
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
              key={index}
              className={`flex justify-center w-[42px] sm:w-[71px] sm:h-[75px] opacity-0 ${
                endGame ? 'cursor-default' : 'hover:opacity-100'
              }`}
            >
              <button
                data-testid={`selector-btn-${column}`}
                disabled={endGame}
                onClick={() => {
                  setAnimationComplete(false);
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
