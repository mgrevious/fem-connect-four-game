import { useAppSelector } from '../../app/hooks';
import Grid from '../grid';
import PlayerScore from '../player-score';
import Selector from '../selector';

const Game = () => {
  const { player1, player2 } = useAppSelector((state) => state.game);
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center min-h-screen relative pt-[43px]">
          <div className="flex justify-between items-center gap-5 min-h-screen">
            <PlayerScore player={player1} />
            <Grid />
            <PlayerScore player={player2} />
          </div>
          <Selector />
        </div>
      </div>
    </>
  );
};

export default Game;
