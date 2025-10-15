import classnames from "classnames";

type UnitOfTimeT = "MINUTES" | "SECONDS";

const UnitOfTime = (props: {
  value: number;
  typing: string;
  name: UnitOfTimeT;
  setActive: (name: UnitOfTimeT) => void;
  active?: UnitOfTimeT;
}) => {
  const value =
    props.name === props.active && props.typing.length > 0
      ? props.typing
      : props.value;
  return (
    <span
      className={classnames("cursor-pointer", {
        "border-solid border-white border-2": props.name === props.active,
      })}
      onClick={() => props.setActive(props.name)}
    >
      {`00${value}`.slice(-2)}
    </span>
  );
};

interface TimerDisplayProps {
  timer: [number, number];
  typing: [string, string];
  activeUnitOfTime?: UnitOfTimeT;
  hideButtons: boolean;
  textColor: string;
  onSetActive: (unit: UnitOfTimeT, currentTimer: [number, number]) => void;
}

const TimerDisplay = ({
  timer,
  typing,
  activeUnitOfTime,
  hideButtons,
  textColor,
  onSetActive,
}: TimerDisplayProps) => {
  return (
    <p
      className={`font-bold text-[16vw] sm:text-[32vmin] md:text-[36vmin] lg:text-[40vmin] ${hideButtons ? "sm:text-[40vmin] md:text-[48vmin] lg:text-[56vmin]" : ""} leading-none select-none w-full max-w-full flex justify-center items-center overflow-hidden`}
      style={{ color: textColor }}
    >
      <UnitOfTime
        value={timer[0]}
        typing={typing[0]}
        name="MINUTES"
        active={activeUnitOfTime}
        setActive={(newActive: UnitOfTimeT) => {
          onSetActive(newActive, timer);
        }}
      />
      :
      <UnitOfTime
        value={timer[1]}
        typing={typing[1]}
        name="SECONDS"
        active={activeUnitOfTime}
        setActive={(newActive: UnitOfTimeT) => {
          onSetActive(newActive, timer);
        }}
      />
    </p>
  );
};

export default TimerDisplay;
export type { UnitOfTimeT };
