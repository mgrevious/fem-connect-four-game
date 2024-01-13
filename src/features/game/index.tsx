import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/PlayScore';
import Header from './components/Header';
import InGameMenu from './components/InGameMenu';
import StartMenu from './pages/StartMenu';
import GameRules from './pages/GameRules';
import { AppView } from './helpers';

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}

`;

const GameContainer = styled.div`
  animation: ${fadeIn} forwards ease-in 1s;
`;

const Game = () => {
  const { player1, player2, currentView } = useAppSelector(
    (state) => state.game
  );

  let renderedView = null;
  if (currentView === AppView.GAME_RULES) {
    renderedView = <GameRules />;
  } else if (currentView === AppView.GAME) {
    renderedView = (
      <GameContainer>
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
      </GameContainer>
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
