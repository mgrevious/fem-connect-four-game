import Player1Svg from '../../assets/images/player-one.svg';
import Player2Svg from '../../assets/images/player-two.svg';
import globalStyles from '../../app.module.css';
import React from 'react';
import { PlayerName } from '../game/game-slice';

interface Props {
  name: PlayerName;
}

const PlayerScore: React.FC<Props> = ({ name = PlayerName.ONE }) => {
  const positionClass =
    'absolute -top-8 left-0 right-0 flex justify-center w-full';
  return (
    <div
      className={`${globalStyles.border} flex flex-col items-center bg-white rounded-[20px] px-[30px] pt-[43px] pb-[23px] w-[200px] relative`}
    >
      <p className="text-xl uppercase font-bold w-full text-center">
        Player {name ? '1' : '2'}
      </p>
      <p className="text-[56px] font-bold text-center">0</p>
      {name === PlayerName.ONE ? (
        <div className={positionClass}>
          <img
            className="w-[54px] h-[61px]"
            src={Player1Svg}
            alt="Player One icon"
          />
        </div>
      ) : (
        <div className={positionClass}>
          <img className="w-[55px]" src={Player2Svg} alt="Player Two icon" />
        </div>
      )}
    </div>
  );
};

export default PlayerScore;
