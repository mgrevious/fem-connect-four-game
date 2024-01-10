import { useAppSelector } from '../../app/hooks';
import Grid from './components/Grid';
import PlayerScore from './components/player-score';
import Header from './components/Header';

const Game = () => {
  const { player1, player2 } = useAppSelector((state) => state.game);
  return (
    <>
      <main className="w-full">
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
      </main>
    </>
  );
};

export default Game;
