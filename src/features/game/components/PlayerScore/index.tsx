import React from 'react';
import { Player } from '../../game.types';
import { PlayerName } from '../../helpers';
import Player1Svg from '../../../../assets/images/player-one.svg';
import Player2Svg from '../../../../assets/images/player-two.svg';

import globalStyles from '../../../../app.module.css';
import InnerScore from './InnerScore';

interface Props {
  className?: string;
  player: Player;
  positionClass: {
    container: string;
    icon: string;
  };
}

const PlayerScore: React.FC<Props> = ({ player, positionClass, className }) => {
  const isPlayerOne = player.name === PlayerName.PLAYER_ONE;
  const iconStyle = `${positionClass.icon} top-3 lg:-top-8 flex justify-center lg:w-full absolute`;

  return (
    <div
      data-testid={`${
        player.name === PlayerName.PLAYER_ONE ? 'player1' : 'player2'
      }`}
      className={`${className || ''} ${globalStyles.border} ${
        positionClass.container
      } flex flex-col sm:flex-row lg:flex-col items-center bg-white rounded-[20px] py-3 sm:px-[45px] lg:px-0 lg:pt-9 lg:pb-[17px] w-[142px] sm:w-[271px] lg:w-[148px] relative`}
    >
      <InnerScore player={player} />
      {isPlayerOne ? (
        <div className={iconStyle}>
          <img
            className="lg:w-[54px] lg:h-[61px]"
            src={Player1Svg}
            alt="Player One icon"
          />
        </div>
      ) : (
        <div className={iconStyle}>
          <img className="w-[55px]" src={Player2Svg} alt="Player Two icon" />
        </div>
      )}
    </div>
  );
};

export default PlayerScore;
