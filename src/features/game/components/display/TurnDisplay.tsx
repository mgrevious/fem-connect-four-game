import { useEffect, useState } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  PlayerName,
  toggleActivePlayer,
  autoSelectWinner,
  PlayerColor,
} from '../../game-slice';
import styles from './display.module.css';

const TurnDisplay = () => {
  let countdownApi: CountdownApi | null = null;
  const dispatch = useAppDispatch();
  const [restartKey, setRestartKey] = useState(1);
  const [showCountdown, setShowCountdown] = useState(true);
  const { activePlayer, gameWinner, endGame, timerReset } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (countdownApi && endGame) {
      // if game has ended, stop countdown timer
      countdownApi.stop();
      setShowCountdown(false);
    }
  }, [endGame, countdownApi]);

  useEffect(() => {
    if (timerReset) {
      setRestartKey(1);
    }
  }, [timerReset]);

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
          {showCountdown ? (
            <Countdown
              key={restartKey}
              ref={(countdown) => {
                if (countdown) {
                  countdownApi = countdown.getApi();
                }
              }}
              autoStart
              date={Date.now() + 30 * 1000}
              renderer={({ seconds }) => {
                return seconds;
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
