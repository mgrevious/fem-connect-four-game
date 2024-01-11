import { MutableRefObject, useEffect, useState } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  PlayerName,
  toggleActivePlayer,
  autoSelectWinner,
  PlayerColor,
} from '../../game-slice';
import styles from './display.module.css';

interface Props {
  countdownApi: MutableRefObject<CountdownApi | null>;
}

const TurnDisplay: React.FC<Props> = ({ countdownApi }) => {
  const dispatch = useAppDispatch();
  const [restartKey, setRestartKey] = useState(1);
  const [showCountdown, setShowCountdown] = useState(true);
  const [remainingTime, setRemainingTime] = useState(30);
  const { activePlayer, gameWinner, endGame, isPaused, timerReset } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    if (countdownApi.current) {
      if (endGame) {
        // if game has ended, stop countdown timer
        countdownApi.current.stop();
        setShowCountdown(false);
      } else if (isPaused) {
        // if in-game menu is open, pause countdown timer
        countdownApi.current.pause();
      } else {
        countdownApi.current.start();
      }
    }
  }, [endGame, isPaused, countdownApi]);

  useEffect(() => {
    if (timerReset) {
      setRestartKey(1);
    }
  }, [timerReset]);
  const show = false;

  return (
    <div
      className={`${styles.timer} ${
        activePlayer.color === PlayerColor.RED ? styles.red : styles.yellow
      } flex justify-center`}
    >
      <div className="w-[197px] pt-11 px-6 text-white font-bold">
        <p className="text-center mb-2 uppercase">
          {endGame ? (
            'game ended'
          ) : (
            <>
              player {activePlayer.name === PlayerName.PLAYER_ONE ? '1' : '2'}'s
              turn
            </>
          )}
        </p>
        <p className="text-center text-[56px] leading-[56px]">
          {show ? (
            <Countdown
              key={restartKey}
              ref={(countdown) => {
                if (countdown) {
                  countdownApi.current = countdown.getApi();
                }
              }}
              autoStart={false}
              date={Date.now() + remainingTime * 1000}
              renderer={({ seconds }) => {
                return seconds;
              }}
              onPause={({ seconds }) => {
                setRemainingTime(seconds);
              }}
              onComplete={() => {
                // if there is no winner, auto select winner
                if (!gameWinner) {
                  dispatch(autoSelectWinner());
                }
                // toggle the active player
                dispatch(toggleActivePlayer());
              }}
            />
          ) : (
            0
          )}
          s
        </p>
      </div>
    </div>
  );
};

export default TurnDisplay;
