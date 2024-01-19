import { useAppDispatch } from '../../../app/hooks';
import CheckmarkSvg from '../../../assets/images/icon-check.svg';
import { selectAppView } from '../game-slice';
import { AppView } from '../helpers';
import { getFadeInContainer } from '../styled-helpers';
import styles from './style.module.css';

const FadeInContainer = getFadeInContainer();

const GameRules = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="flex justify-center">
        <FadeInContainer
          className={`${styles.gameRules} relative flex flex-col justify-end py-12 px-9 max-w-[90%] sm:w-[534px] bg-white border-l-[3px] border-t-[3px] border-r-[3px] border-b-[13px] border-black rounded-[40px] opacity-0`}
        >
          <h1 className="uppercase mb-7 font-bold text-[56px] leading-[56px] text-center">
            rules
          </h1>
          <h2 className="uppercase text-primary mb-4 text-xl font-bold">
            objective
          </h2>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
          <h2 className="uppercase text-primary mb-4 mt-10 text-xl font-bold">
            how to play
          </h2>
          <ul>
            <li className="flex mb-3">
              <span className="w-8 font-bold inline-block flex-none">1</span>
              <span>Red goes first in the first game.</span>
            </li>
            <li className="flex mb-3">
              <span className="w-8 font-bold inline-block flex-none">2</span>
              <span>
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </span>
            </li>
            <li className="flex mb-3">
              <span className="w-8 font-bold inline-block flex-none">3</span>
              <span>
                The game ends when there is a 4-in-a-row or a stalemate.
              </span>
            </li>
            <li className="flex">
              <span className="w-8 font-bold inline-block flex-none">4</span>
              <span>
                The starter of the previous game goes second on the next game.
              </span>
            </li>
          </ul>
          <div className="absolute left-0 right-0 -bottom-11 flex justify-center">
            <button
              className="active:translate-y-1 active:transition-transform"
              onClick={() => {
                dispatch(selectAppView(AppView.MAIN_MENU));
              }}
            >
              <img src={CheckmarkSvg} alt="red check mark icon" />
            </button>
          </div>
        </FadeInContainer>
      </div>
    </div>
  );
};

export default GameRules;
