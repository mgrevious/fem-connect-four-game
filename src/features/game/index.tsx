import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/PlayScore';
import Header from './components/Header';
import InGameMenu from './components/InGameMenu';
import StartMenu from './pages/StartMenu';
import GameRules from './pages/GameRules';
import { AppView } from './helpers';
import { getFadeInContainer } from './styled-helpers';

const FadeInContainer = getFadeInContainer();

const player1Class = '-left-7 lg:right-0';
const player2Class = '-right-7 lg:right-0';

const Game = () => {
  const { player1, player2, currentView } = useAppSelector(
    (state) => state.game
  );

  let renderedView = null;
  if (currentView === AppView.GAME_RULES) {
    renderedView = <GameRules />;
  } else if (currentView === AppView.GAME) {
    renderedView = (
      <FadeInContainer>
        <div className="container mx-auto">
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
      </FadeInContainer>
    );
  } else {
    renderedView = (
      <div className="bg-primary-dark">
        <StartMenu />
      </div>
    );
  }

  return <main className="w-full">{renderedView}</main>;
};

export default Game;
