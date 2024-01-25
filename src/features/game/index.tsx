import { useAppSelector } from '../../app/hooks';
import StartMenu from './pages/StartMenu';
import GameRules from './pages/GameRules';
import Game from './pages/Game';
import { AppView } from './helpers';

const ConnectFour = () => {
  const { currentView } = useAppSelector((state) => state.game);

  let renderedView = null;
  if (currentView === AppView.GAME_RULES) {
    renderedView = <GameRules />;
  } else if (currentView === AppView.GAME) {
    renderedView = <Game />;
  } else {
    renderedView = (
      <main className="bg-primary lg:bg-primary-dark">
        <StartMenu />
      </main>
    );
  }

  return <div className="w-full">{renderedView} </div>;
};

export default ConnectFour;
