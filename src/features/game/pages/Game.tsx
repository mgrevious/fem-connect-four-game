import { useAppSelector } from '../../../app/hooks';
import Grid from '../components/Grid';
import PlayerScore from '../components/PlayerScore';
import Header from '../components/Header';
import InGameMenu from '../components/InGameMenu';
import { AppView, PlayerName } from '../helpers';
import { getFadeInContainer } from '../styled-helpers';

const FadeInContainer = getFadeInContainer();

const player1IconClass = '-left-7 lg:right-0 lg:left-0';
const player2IconClass = '-right-7 lg:right-0 lg:left-0';

const Game = () => {
  const { player1, player2, gameWinner, currentView } = useAppSelector(
    (state) => state.game
  );

  let bgColor = 'bg-primary-dark';
  if (gameWinner === PlayerName.PLAYER_ONE) {
    bgColor = 'bg-coral';
  } else if (gameWinner === PlayerName.PLAYER_TWO) {
    bgColor = 'bg-mustard';
  }

  return (
    <FadeInContainer className="relative z-10">
      <div data-testid="game" className="relative min-h-screen z-30">
        <header className="max-w-[332px] sm:max-w-[636px] mx-auto">
          <Header />
        </header>
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-[19px] lg:gap-[57px]">
            <div className="order-1 lg:gap-0 lg:order-1 flex lg:block justify-between w-full">
              <PlayerScore
                className="ml-6 lg:ml-0 lg:mb-10"
                positionClass={{
                  icon: player1IconClass,
                  container: 'sm:justify-between lg:justify-center',
                }}
                player={player1}
              />
              <div className="lg:hidden w-[142px] sm:w-[271px] mr-6">
                <PlayerScore
                  positionClass={{
                    icon: player2IconClass,
                    container: 'sm:justify-between lg:justify-center',
                  }}
                  player={player2}
                />
              </div>
            </div>
            <div className="order-3 lg:order-2">
              <Grid />
            </div>
            <div className="hidden lg:order-3 lg:block">
              <PlayerScore
                className="lg:mb-10"
                positionClass={{
                  icon: player2IconClass,
                  container: 'sm:justify-between lg:justify-center',
                }}
                player={player2}
              />
            </div>
          </div>
        </main>
      </div>
      <InGameMenu />
      {currentView === AppView.GAME && (
        <div
          data-testid="bg-color"
          className={`${bgColor} rounded-t-[60px] fixed w-full top-[520px] sm:top-[800px] lg:top-[700px] h-5/6 left-0 right-0 z-10`}
        ></div>
      )}
    </FadeInContainer>
  );
};

export default Game;
