import React from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import {
  REMAINING_TIME,
  pauseGame,
  restartGame,
  setRemainingTime,
  setTimerReset,
} from '../../game-slice';
import styles from './header.module.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div data-testid="header">
      <nav
        className={`${styles.menu} flex justify-between items-center mt-9 mb-6 lg:mt-[50px] lg:mb-[44px]`}
      >
        <button
          data-testid="header-navigate-to-menu"
          onClick={() => {
            dispatch(pauseGame(true));
          }}
          className="h-[39px] px-[21px] text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
        >
          menu
        </button>
        <button
          data-testid="header-restart"
          onClick={() => {
            dispatch(restartGame());
            dispatch(setRemainingTime(REMAINING_TIME));
            dispatch(setTimerReset(true));
            dispatch(pauseGame(false));
          }}
          className="h-[39px] px-[21px] text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
        >
          restart
        </button>
      </nav>
    </div>
  );
};

export default Header;
