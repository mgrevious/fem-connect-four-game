import CounterRedSmallSvg from '../../assets/images/counter-red-small.svg';
import CounterYellowSmallSvg from '../../assets/images/counter-yellow-small.svg';
import PlayerVsPlayerSvg from '../../assets/images/player-vs-player.svg';
import globalStyles from '../../app.module.css';

const StartMenu = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="w-[486px] h-[451px] flex justify-center">
          <div className="flex flex-col justify-end items-center p-[37px] w-[480px] h-[435px] bg-primary border-l-[3px] border-t-[3px] border-r-[3px] border-b-[13px] border-black rounded-[40px]">
            <div className="mb-[70px] mt-[30px]">
              <div className="flex justify-between gap-1">
                <img
                  src={CounterRedSmallSvg}
                  alt="Red Counter Icon"
                  className="w-[26px]"
                />
                <img
                  src={CounterYellowSmallSvg}
                  alt="Yellow Counter Icon"
                  className="w-[26px]"
                />
              </div>
              <div className="flex justify-between gap-1">
                <img
                  src={CounterYellowSmallSvg}
                  alt="Yellow Counter Icon"
                  className="w-[26px]"
                />
                <img
                  src={CounterRedSmallSvg}
                  alt="Red Counter Icon"
                  className="w-[26px]"
                />
              </div>
            </div>
            <button
              className={`${globalStyles.border} w-full uppercase text-2xl font-bold px-5 active:border-b-8 active:translate-y-1 active:transition-transform rounded-[20px] bg-mustard h-[85px] mb-[14px]`}
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
              className={`${globalStyles.border} w-full uppercase text-2xl font-bold px-5 active:border-b-8 active:translate-y-1 active:transition-transform rounded-[20px] bg-white h-[85px] mb-[10px]`}
            >
              <span className="flex items-center justify-start">
                <span>game rules</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
