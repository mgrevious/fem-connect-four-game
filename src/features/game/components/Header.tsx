import React from 'react';
import MenuSvg from '../../../assets/images/logo.svg';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="flex justify-between items-center my-12">
        <div>
          <button className="py-[10px] px-[21px] text-white font-bold bg-primary-dark uppercase rounded-[30px]">
            menu
          </button>
        </div>
        <div>
          <img src={MenuSvg} alt="Menu Icon" />
        </div>
        <div>
          <button className="py-[12px] px-6 text-white font-bold bg-primary-dark uppercase rounded-[30px]">
            restart
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
