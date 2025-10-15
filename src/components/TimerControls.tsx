import Button from "./Button";
import { TimerButtonProps } from "./Types";

interface TimerControlsProps {
  isRunning: boolean;
  hideButtons: boolean;
  textColor: string;
  timerButtons: TimerButtonProps[];
  onStartStop: () => void;
  onReset: () => void;
  onPresetClick: (time: [number, number]) => void;
}

const TimerControls = ({
  isRunning,
  hideButtons,
  textColor,
  timerButtons,
  onStartStop,
  onReset,
  onPresetClick,
}: TimerControlsProps) => {
  if (hideButtons) return null;

  return (
    <div className="flex flex-col gap-3 w-full items-center" style={{ visibility: hideButtons ? "hidden" : "visible" }}>
  <div className="flex flex-row flex-wrap justify-center items-center w-full gap-x-4 gap-y-4">
        <Button
          className="text-lg sm:text-[8vmin] h-12 sm:h-[12vmin] w-28 sm:w-[24vmin]"
          onClick={onStartStop}
          textColor={textColor}
        >
          {isRunning ? "stop" : "start"}
        </Button>
        <Button
          className="text-lg sm:text-[8vmin] h-12 sm:h-[12vmin] w-28 sm:w-[24vmin]"
          onClick={onReset}
          textColor={textColor}
        >
          reset
        </Button>
      </div>
  <div className="flex flex-row flex-wrap justify-center items-center w-full gap-x-4 gap-y-4">
        {timerButtons.map(({ text, time }) => (
          <Button
            key={text}
            className="text-base sm:text-[5vmin] h-10 sm:h-[10vmin] w-20 sm:w-[16vmin]"
            onClick={() => onPresetClick(time)}
            textColor={textColor}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimerControls;
