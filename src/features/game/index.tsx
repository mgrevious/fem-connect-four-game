import Grid from '../grid';
import PlayerScore from '../player-score';
import { PlayerName } from './game-slice';

const Game = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-between items-center gap-5 min-h-screen">
            <PlayerScore name={PlayerName.ONE} />
            <Grid />
            <PlayerScore name={PlayerName.TWO} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
