import LogoSvg from '../../../assets/images/logo.svg';
import PlayerVsPlayerSvg from '../../../assets/images/player-vs-player.svg';
import { useAppDispatch } from '../../../app/hooks';
import { selectAppView, startGame } from '../game-slice';
import { AppView } from '../helpers';

import globalStyles from '../../../app.module.css';
import { getFadeInContainer } from '../styled-helpers';

const FadeInContainer = getFadeInContainer();

const StartMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <div data-testid="start-menu" className="mx-auto w-11/12 h-screen">
      <div className="flex flex-col items-center">
        <FadeInContainer className="w-full h-screen pt-[200px] lg:mt-[230px] lg:p-[44px] lg:w-[480px] lg:h-[435px] border-0 bg-primary lg:border-l-[3px] lg:border-t-[3px] lg:border-r-[3px] lg:border-b-[13px] lg:border-black rounded-[40px]">
          <div className="mb-[70px] mt-[30px] flex justify-center">
            <img src={LogoSvg} alt="logo icon" />
          </div>
          <button
            onClick={() => {
              dispatch(startGame());
            }}
            className={`${globalStyles.border} w-full uppercase text-2xl font-bold px-5 active:border-b-8 active:translate-y-1 active:transition-transform bg-mustard h-[85px] mb-[14px]`}
          >
            <span className="flex items-center justify-between">
              <span>player vs player</span>
              <img
                src={PlayerVsPlayerSvg}
                alt="Player vs Player Icon"
                className="w-[76px]"
              />
            </span>
          </button>
          <button
            onClick={() => {
              dispatch(selectAppView(AppView.GAME_RULES));
            }}
            className={`${globalStyles.border} w-full uppercase text-2xl font-bold px-5 active:border-b-8 active:translate-y-1 active:transition-transform bg-white h-[85px] mb-[10px]`}
          >
            <span className="flex items-center justify-start">
              <span>game rules</span>
            </span>
          </button>
        </FadeInContainer>
      </div>
    </div>
  );
};

export default StartMenu;
