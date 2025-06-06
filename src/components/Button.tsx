import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface TimerButtonProps {
  className: string;
  onClick: () => void;
  textColor: string;
  setActiveUnitOfTime?: (() => void) | undefined;
  activeUnitOfTime?: unknown;
}

const TimerButton = ({
  className,
  onClick,
  children,
  textColor,
  setActiveUnitOfTime,
  activeUnitOfTime
}: PropsWithChildren<TimerButtonProps>) => (
  <div
    tabIndex={-1}
    className={classnames(
      "bg-white/10 leading-10 rounded-[1vmin] border-none outline-none flex flex-col text-center justify-center cursor-pointer hover:bg-white/40",
      className
    )}
    style={{ color: textColor }}
    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
      onClick();
      if (activeUnitOfTime && setActiveUnitOfTime) {
        setActiveUnitOfTime();
      }
    }}
    onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault();
    }}
  >
    {children}
  </div>
);

export default TimerButton;
