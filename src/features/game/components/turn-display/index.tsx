import Countdown from 'react-countdown';
import { useAppSelector } from '../../../../app/hooks';
import { PlayerName, toggleActivePlayer } from '../../game-slice';
import styles from './turn-display.module.css';

const TurnDisplay = () => {
  const { activePlayer } = useAppSelector((state) => state.game);

  return (
    <div className={`${styles.timer} flex justify-center`}>
      <div className="w-[197px] pt-11 px-6 text-white font-bold">
        <p className="text-center mb-2 uppercase">
          player {activePlayer.name === PlayerName.PLAYER_ONE ? '1' : '2'}'s
          turn
        </p>
        <p className="text-center text-[56px] leading-[56px]">
          <Countdown
            autoStart
            date={Date.now() + 30 * 1000}
            renderer={({ seconds }) => {
              return seconds;
            }}
          />
          s
        </p>
      </div>
    </div>
  );
};

export default TurnDisplay;
