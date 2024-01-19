import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/PlayScore';
import Header from './components/Header';
import InGameMenu from './components/InGameMenu';
import StartMenu from './pages/StartMenu';
import GameRules from './pages/GameRules';
import { AppView, PlayerName } from './helpers';
import { getFadeInContainer } from './styled-helpers';
import { Player } from './game.types';

const FadeInContainer = getFadeInContainer();

const player1Class = '-left-7 lg:right-0 lg:left-0';
const player2Class = '-right-7 lg:right-0 lg:left-0';

function renderPlayerScore(player: Player) {
  const isPlayerOne = player.name === PlayerName.PLAYER_ONE;
  return (
    <>
      <p
        className={`${
          isPlayerOne ? 'order-1' : 'order-2'
        } text-base sm:text-xl uppercase font-bold w-full text-center ${
          isPlayerOne ? 'sm:text-left' : 'sm:text-right'
        } lg:text-center`}
      >
        Player {isPlayerOne ? '1' : '2'}
      </p>
      <p
        className={`${
          isPlayerOne ? 'order-1 sm:order-2' : 'order-2 sm:order-1'
        } text-[32px] leading-[44px] sm:text-[56px] sm:leading-[71px] font-bold text-center`}
      >
        {player.currentScore}
      </p>
    </>
  );
}

const Game = () => {
  const { player1, player2, currentView, gameWinner } = useAppSelector(
    (state) => state.game
  );

  let bgColor = 'bg-primary-dark';
  if (gameWinner === PlayerName.PLAYER_ONE) {
    bgColor = 'bg-coral';
  } else if (gameWinner === PlayerName.PLAYER_TWO) {
    bgColor = 'bg-mustard';
  }

  let renderedView = null;
  if (currentView === AppView.GAME_RULES) {
    renderedView = <GameRules />;
  } else if (currentView === AppView.GAME) {
    renderedView = (
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
  } else {
    renderedView = (
      <div className="bg-primary lg:bg-primary-dark">
        <StartMenu />
      </div>
    );
  }

  return <main className="w-full">{renderedView} </main>;
};

export default Game;
