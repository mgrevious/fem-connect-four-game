import React from 'react';
import MenuSvg from '../../../assets/images/logo.svg';
import { useAppDispatch } from '../../../app/hooks';
import { pauseGame } from '../game-slice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <header>
      <nav className="flex justify-between items-center my-12">
        <div>
          <button
            onClick={() => {
              dispatch(pauseGame(true));
            }}
            className="py-[10px] px-[21px] text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90"
          >
            menu
          </button>
        </div>
        <div>
          <img src={MenuSvg} alt="Menu Icon" />
        </div>
        <div>
          <button className="py-[12px] px-6 text-white font-bold bg-primary-dark uppercase rounded-[30px] hover:brightness-90">
            restart
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
