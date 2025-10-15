import { useEffect } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";

type UnitOfTimeT = "MINUTES" | "SECONDS";

interface UseTimerHotkeysProps {
  timer: [number, number];
  typing: [string, string];
  isRunning: boolean;
  activeUnitOfTime?: UnitOfTimeT;
  initTimer: [number, number];
  stoppedTimer: [number, number];
  showMenu: boolean;
  setRunning: (running: boolean) => void;
  setTimer: (timer: [number, number]) => void;
  setTyping: (typing: [string, string]) => void;
  setActiveUnitOfTime: (unit: UnitOfTimeT | undefined) => void;
  setInitTimer: (timer: [number, number]) => void;
  setShowMenu: (show: boolean) => void;
  toggleButtonsVisibility: () => void;
}

export const useTimerHotkeys = ({
  timer,
  typing,
  isRunning,
  activeUnitOfTime,
  initTimer,
  stoppedTimer,
  showMenu,
  setRunning,
  setTimer,
  setTyping,
  setActiveUnitOfTime,
  setInitTimer,
  setShowMenu,
  toggleButtonsVisibility,
}: UseTimerHotkeysProps) => {
  useHotkeys("f", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  });

  useHotkeys("m", () => {
    setShowMenu(!showMenu);
  });

  useHotkeys("h", () => {
    toggleButtonsVisibility();
    setShowMenu(false);
  });

  useHotkeys(" ", () => {
    if (timer[0] || timer[1]) {
      setRunning(!isRunning);
    }
  });

  useHotkeys("r", () => {
    setRunning(false);
    setTimer(initTimer);
  });

  useHotkeys("Escape", () => {
    if (activeUnitOfTime) {
      setTyping(["", ""]);
      setTimer(stoppedTimer);
      setActiveUnitOfTime(undefined);
    }
  });

  useHotkeys("Enter", () => {
    if (activeUnitOfTime) {
      setActiveUnitOfTime(undefined);
      const newMinute = typing[0].length === 0 ? timer[0] : parseInt(typing[0]);
      const newSeconds =
        typing[1].length === 0 ? timer[1] : parseInt(typing[1]);
      if (activeUnitOfTime === "MINUTES") {
        setTimer([newMinute, timer[1]]);
      }
      if (activeUnitOfTime === "SECONDS") {
        setTimer([timer[0], newSeconds]);
      }
      setTyping(["", ""]);
      setInitTimer([newMinute, newSeconds]);
    }
  });

  useHotkeys(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], (event) => {
    const currentValue = activeUnitOfTime === "MINUTES" ? typing[0] : typing[1];
    const newValue = `${currentValue}${event.key}`.slice(-2);
    if (activeUnitOfTime) {
      if (activeUnitOfTime === "MINUTES") {
        setTyping([newValue, typing[1]]);
        if (newValue.length === 2) {
          setTimer([parseInt(newValue), timer[1]]);
          setInitTimer([parseInt(newValue), timer[1]]);
          setActiveUnitOfTime("SECONDS");
        }
      } else {
        const newSeconds =
          typing[1].length === 0 ? timer[1] : parseInt(typing[1]);
        if (newSeconds == 60) {
          setTyping(["", ""]);
          setTimer([timer[0] + 1, 0]);
          setInitTimer([timer[0] + 1, 0]);
          setActiveUnitOfTime(undefined);
        } else if (newSeconds > 60) {
          setTyping(["", ""]);
          setActiveUnitOfTime(undefined);
        } else {
          setTyping([typing[0], newValue]);
          if (newValue.length === 2) {
            setActiveUnitOfTime(undefined);
            setTimer([timer[0], parseInt(newValue)]);
            setInitTimer([timer[0], parseInt(newValue)]);
            setTyping(["", ""]);
          }
        }
      }
    }
  });

  // Stop timer when typing
  useEffect(() => {
    if (activeUnitOfTime && isRunning) {
      setRunning(false);
    }
  }, [activeUnitOfTime, isRunning, setRunning]);
};
