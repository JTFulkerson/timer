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
      className={`font-bold text-[44vmin] ${hideButtons ? "text-[55vmin]" : ""}`}
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
