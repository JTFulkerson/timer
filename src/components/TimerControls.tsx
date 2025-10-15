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
    <>
      <div
        className="flex flex-row gap-[3vmin]"
        style={{ visibility: hideButtons ? "hidden" : "visible" }}
      >
        <Button
          className="text-[8vmin] h-[12vmin] w-[24vmin]"
          onClick={onStartStop}
          textColor={textColor}
        >
          {isRunning ? "stop" : "start"}
        </Button>
        <Button
          className="text-[8vmin] h-[12vmin] w-[24vmin]"
          onClick={onReset}
          textColor={textColor}
        >
          reset
        </Button>
      </div>
      <div
        className="flex flex-row gap-[3vmin]"
        style={{ visibility: hideButtons ? "hidden" : "visible" }}
      >
        {timerButtons.map(({ text, time }) => (
          <Button
            key={text}
            className="text-[5vmin] h-[10vmin] w-[16vmin]"
            onClick={() => onPresetClick(time)}
            textColor={textColor}
          >
            {text}
          </Button>
        ))}
      </div>
    </>
  );
};

export default TimerControls;
