import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import appStyles from '../../../../app.module.css';
import { PlayerName } from '../../game-slice';

const WinnerDisplay: React.FC = () => {
  const { gameWinner } = useAppSelector((state) => state.game);
  return (
    <div className="w-full absolute -bottom-[139px] flex justify-center items-center">
      <div
        className={`w-[291px] h-[196px] bg-white ${appStyles.borderNoHover} rounded-[20px] flex flex-col items-center py-5`}
      >
        <p className="text-center mb-1 font-bold uppercase text-base">
          player {gameWinner === PlayerName.PLAYER_ONE ? '1' : '2'}
        </p>{' '}
        <p className="text-center text-[56px] leading-[56px] mb-2 uppercase font-bold">
          wins
        </p>
        <button className="bg-primary-dark text-white font-bold rounded-full uppercase text-base py-2 px-6 hover:bg-primary">
          play again
        </button>
      </div>
    </div>
  );
};

export default WinnerDisplay;
