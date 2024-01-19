import React from 'react';
import { getFadeInContainer } from '../styled-helpers';
import Header from '../components/Header';
import PlayerScore from '../components/PlayerScore';

const FadeInContainer = getFadeInContainer();
const player1Class = '-left-7 lg:right-0 lg:left-0';
const player2Class = '-right-7 lg:right-0 lg:left-0';

const Game = () => {
  return (
    <FadeInContainer className="relative z-10">
      <div className="relative min-h-screen z-30">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full px-6 lg:w-[635px]">
            <Header />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-5">
            <div className="order-1 lg:gap-0 lg:order-1 flex lg:block justify-between w-full">
              <PlayerScore
                className="ml-5"
                positionClass={player1Class}
                player={player1}
              >
                {renderPlayerScore(player1)}
              </PlayerScore>
              <div className="lg:hidden w-[142px] sm:w-[271px] mr-5">
                <PlayerScore positionClass={player2Class} player={player2}>
                  {renderPlayerScore(player2)}
                </PlayerScore>
              </div>
            </div>
            <div className="order-3 lg:order-2">
              <Grid />
            </div>
            <div className="hidden lg:order-3 lg:block">
              <PlayerScore positionClass={player2Class} player={player2}>
                {renderPlayerScore(player2)}
              </PlayerScore>
            </div>
          </div>
        </div>
      </div>
      <InGameMenu />
      {currentView === AppView.GAME && (
        <div
          className={`${bgColor} rounded-t-[60px] fixed w-full bottom-0 left-0 right-0 h-[30%] lg:h-[33%] z-10`}
        ></div>
      )}
    </FadeInContainer>
  );
};

export default Game;
