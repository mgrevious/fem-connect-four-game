import React from 'react';
import { Player } from '../game.types';
import { useAppSelector } from '../../../app/hooks';
import { PlayerName } from '../helpers';
import Player1Svg from '../../../assets/images/player-one.svg';
import Player2Svg from '../../../assets/images/player-two.svg';

import globalStyles from '../../../app.module.css';

interface Props {
  player: Player;
  positionClass: string;
}

const PlayScore: React.FC<Props> = ({ player, positionClass }) => {
  const { player1, player2 } = useAppSelector((state) => state.game);
  const isPlayerOne = player.name === PlayerName.PLAYER_ONE;
  const positionStyle = `${positionClass} top-3 lg:-top-8 flex justify-center lg:w-full absolute`;

  return (
    <div
      className={`${globalStyles.border} flex flex-col items-center bg-white rounded-[20px] p-3 lg:px-[30px] lg:pt-[43px] lg:pb-[23px] w-[148px] lg:w-[200px] relative`}
    >
      <p className="text-base lg:text-xl  uppercase font-bold w-full text-center">
        Player {isPlayerOne ? '1' : '2'}
      </p>
      <p className="text-[32px] leading-[40px] lg:text-[56px] lg:leading-[71px] font-bold text-center">
        {isPlayerOne ? player1.currentScore : player2.currentScore}
      </p>
      {isPlayerOne ? (
        <div className={positionStyle}>
          <img
            className="lg:w-[54px] lg:h-[61px]"
            src={Player1Svg}
            alt="Player One icon"
          />
        </div>
      ) : (
        <div className={positionStyle}>
          <img className="w-[55px]" src={Player2Svg} alt="Player Two icon" />
        </div>
      )}
    </div>
  );
};

export default PlayScore;
