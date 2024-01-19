import React from 'react';
import MenuSvg from '../../../assets/images/logo.svg';
import { useAppDispatch } from '../../../app/hooks';
import { pauseGame, restartGame, setRemainingTime } from '../game-slice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <nav className="flex justify-between items-center my-12">
        <div>
          <button
            onClick={() => {
              dispatch(pauseGame(true));
            }}
            className="h-[39px] px-[21px] text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
          >
            menu
          </button>
        </div>
        <div>
          <img src={MenuSvg} alt="Menu Icon" className="w-[46px] sm:w-[56px]" />
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(restartGame());
              dispatch(setRemainingTime(30 * 1000));
              dispatch(pauseGame(false));
            }}
            className="h-[39px] px-6 text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
          >
            restart
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
