import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/player-score';
import Header from './components/Header';
import InGameMenu from './components/ingame-menu';
import StartMenu from './pages/start-menu';
import { AppView } from './game-slice';
import GameRules from './pages/game-rules';

const Game = () => {
  const { player1, player2, currentView } = useAppSelector(
    (state) => state.game
  );

  let renderedView = null;
  if (currentView === AppView.GAME_RULES) {
    renderedView = <GameRules />;
  } else if (currentView === AppView.GAME) {
    renderedView = (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="w-[635px]">
            <Header />
          </div>
          <div className="flex justify-between items-center gap-5">
            <PlayerScore player={player1} />
            <Grid />
            <PlayerScore player={player2} />
          </div>
        </div>
        <InGameMenu />
      </>
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
