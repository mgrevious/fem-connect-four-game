import React, { ReactNode } from 'react';
import { Player } from '../game.types';
import { PlayerName } from '../helpers';
import Player1Svg from '../../../assets/images/player-one.svg';
import Player2Svg from '../../../assets/images/player-two.svg';

import globalStyles from '../../../app.module.css';

interface Props {
  className?: string;
  player: Player;
  positionClass: string;
  children: ReactNode;
}

const PlayScore: React.FC<Props> = ({
  player,
  positionClass,
  className,
  children,
}) => {
  const isPlayerOne = player.name === PlayerName.PLAYER_ONE;
  const positionStyle = `${positionClass} top-3 lg:-top-8 flex justify-center lg:w-full absolute`;

  return (
    <div
      className={`${className} ${globalStyles.border} flex flex-col sm:flex-row lg:flex-col items-center bg-white rounded-[20px] p-3 sm:px-[45px] lg:px-[30px] lg:pt-[43px] lg:pb-[23px w-[142px] sm:w-[271px] lg:w-[200px] relative`}
    >
      {children}
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
