import React from 'react';
import { Player } from '../../game.types';
import { PlayerName } from '../../helpers';

interface Props {
  player: Player;
}

const InnerScore: React.FC<Props> = ({ player }) => {
  const isPlayerOne = player.name === PlayerName.PLAYER_ONE;
  return (
    <>
      <p
        className={`${
          isPlayerOne ? 'sm:text-left' : 'sm:text-right sm:order-2 lg:order-1'
        } order-1 text-base sm:text-xl uppercase font-bold w-full text-center lg:text-center`}
      >
        Player {isPlayerOne ? '1' : '2'}
      </p>
      <p
        className={`${
          !isPlayerOne && 'sm:order-1 lg:order-2'
        } order-2 text-[32px] leading-[44px] sm:text-[56px] sm:leading-[71px] font-bold text-center`}
      >
        {player.currentScore}
      </p>
    </>
  );
};

export default InnerScore;
