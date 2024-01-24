import React from 'react';
// import MenuSvg from '../../../../assets/images/logo.svg';
import { useAppDispatch } from '../../../../app/hooks';
import {
  REMAINING_TIME,
  pauseGame,
  restartGame,
  setRemainingTime,
} from '../../game-slice';
import styles from './header.module.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <nav
        className={`${styles.menu} flex justify-between items-center mt-9 mb-6 lg:mt-12 lg:mb-10`}
      >
        <button
          onClick={() => {
            dispatch(pauseGame(true));
          }}
          className="h-[39px] px-8 text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
        >
          menu
        </button>
        <button
          onClick={() => {
            dispatch(restartGame());
            dispatch(setRemainingTime(REMAINING_TIME));
            dispatch(pauseGame(false));
          }}
          className="h-[39px] px-5 text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
        >
          restart
        </button>
      </nav>
    </div>
  );
};

export default Header;
