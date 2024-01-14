import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/PlayScore';
import Header from './components/Header';
import InGameMenu from './components/InGameMenu';
import StartMenu from './pages/StartMenu';
import GameRules from './pages/GameRules';
import { AppView, PlayerColor, PlayerName } from './helpers';
import { getFadeInContainer } from './styled-helpers';

const FadeInContainer = getFadeInContainer();

const player1Class = '-left-7 lg:right-0 lg:left-0';
const player2Class = '-right-7 lg:right-0 lg:left-0';

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
      <FadeInContainer className="relative z-10 min-h-screen">
        <div className="relative z-30">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full px-6 lg:w-[635px]">
              <Header />
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-5">
              <div className="order-1 gap-4 lg:gap-0 lg:order-1 flex lg:block justify-between">
                <PlayerScore positionClass={player1Class} player={player1} />
                <div className="lg:hidden">
                  <PlayerScore positionClass={player2Class} player={player2} />
                </div>
              </div>
              <div className="order-3 lg:order-2">
                <Grid />
              </div>
              <div className="hidden lg:order-3 lg:block">
                <PlayerScore positionClass={player2Class} player={player2} />
              </div>
            </div>
          </div>
        </div>
        <InGameMenu />
        {currentView === AppView.GAME && (
          <div
            className={`${bgColor} rounded-t-[60px] absolute bottom-0 left-0 right-0 h-[35%] z-10`}
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

  return <main className="w-full h-screen">{renderedView} </main>;
};

export default Game;
