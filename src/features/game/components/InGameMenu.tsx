import {
  REMAINING_TIME,
  pauseGame,
  restartGame,
  selectAppView,
  setRemainingTime,
} from '../game-slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppView } from '../helpers';

import appStyles from '../../../app.module.css';

const InGameMenu = () => {
  const dispatch = useAppDispatch();
  const { isPaused } = useAppSelector((state) => state.game);
  return (
    <div
      aria-hidden="true"
      className={`${
        isPaused ? 'visible bg-black/50' : 'invisible'
      } fixed top-0 left-0 right-0 h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center outline-none focus:outline-none z-40`}
    >
      <div
        className={`${appStyles.borderNoHover} ${
          isPaused ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        } transition-all duration-500 ease-in-out bg-primary w-[90%] sm:w-[486px] lg:h-[517px] rounded-[40px] mx-auto z-50 p-10 flex flex-col items-center`}
      >
        <h2 className="uppercase font-bold text-[56px] text-center text-white mt-4 mb-8">
          pause
        </h2>
        <button
          onClick={() => {
            dispatch(pauseGame(false));
          }}
          className={`${appStyles.border} font-bold text-2xl uppercase active:translate-y-1 active:transition-transform mb-4 py-4 w-full bg-white`}
        >
          continue game
        </button>
        <button
          onClick={() => {
            dispatch(restartGame());
            dispatch(setRemainingTime(REMAINING_TIME));
            dispatch(pauseGame(false));
          }}
          className={`${appStyles.border} font-bold text-2xl uppercase active:translate-y-1 active:transition-transform mb-4 py-4 w-full bg-white`}
        >
          restart
        </button>
        <button
          onClick={() => {
            dispatch(selectAppView(AppView.MAIN_MENU));
          }}
          className={`${appStyles.border} font-bold text-2xl uppercase active:translate-y-1 active:transition-transform mb-4 py-4 w-full bg-coral text-white`}
        >
          quit game
        </button>
      </div>
    </div>
  );
};

export default InGameMenu;
