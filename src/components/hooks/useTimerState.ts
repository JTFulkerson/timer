import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface ColorSettings {
  backgroundColor: string;
  textColor: string;
  backgroundWarningColor: string;
  backgroundStopColor: string;
}

const getLocalStorageItem = (key: string, defaultValue: string): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const useColorSettings = () => {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [backgroundWarningColor, setBackgroundWarningColor] = useState(() =>
    getLocalStorageItem("backgroundWarningColor", "#EAB308")
  );
  const [backgroundStopColor, setBackgroundStopColor] = useState(() =>
    getLocalStorageItem("backgroundStopColor", "#8B0000")
  );

  const handleSetBackgroundColor = (color: string) => {
    setBackgroundColor(color);
    setLocalStorageItem("backgroundColor", color);
  };

  const handleSetTextColor = (color: string) => {
    setTextColor(color);
    setLocalStorageItem("textColor", color);
  };

  const handleSetBackgroundWarningColor = (color: string) => {
    setBackgroundWarningColor(color);
    setLocalStorageItem("backgroundWarningColor", color);
  };

  const handleSetBackgroundStopColor = (color: string) => {
    setBackgroundStopColor(color);
    setLocalStorageItem("backgroundStopColor", color);
  };

  return {
    backgroundColor,
    textColor,
    backgroundWarningColor,
    backgroundStopColor,
    setBackgroundColor: handleSetBackgroundColor,
    setTextColor: handleSetTextColor,
    setBackgroundWarningColor: handleSetBackgroundWarningColor,
    setBackgroundStopColor: handleSetBackgroundStopColor,
  };
};

export const useTimerSettings = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage("soundEnabled", false);
  const [backgroundWarning, setBackgroundWarning] = useLocalStorage("backgroundWarning", true);
  const [customSoundUrl, setCustomSoundUrl] = useLocalStorage("customSoundUrl", "");

  return {
    soundEnabled,
    setSoundEnabled,
    backgroundWarning,
    setBackgroundWarning,
    customSoundUrl,
    setCustomSoundUrl,
  };
};

export const useTimerState = () => {
  const [timer, setTimer] = useState<[number, number]>([1, 0]);
  const [initTimer, setInitTimer] = useState<[number, number]>([1, 0]);
  const [stoppedTimer, setStoppedTimer] = useState<[number, number]>([1, 0]);
  const [isRunning, setRunning] = useState(false);

  return {
    timer,
    setTimer,
    initTimer,
    setInitTimer,
    stoppedTimer,
    setStoppedTimer,
    isRunning,
    setRunning,
  };
};

export const useTimerInput = () => {
  const [activeUnitOfTime, setActiveUnitOfTime] = useState<"MINUTES" | "SECONDS" | undefined>();
  const [typing, setTyping] = useState<[string, string]>(["", ""]);

  return {
    activeUnitOfTime,
    setActiveUnitOfTime,
    typing,
    setTyping,
  };
};

export const useUIState = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hideButtons, setHideButtons] = useLocalStorage("hideButtons", false);

  const toggleButtonsVisibility = () => {
    setHideButtons(!hideButtons);
  };

  return {
    showMenu,
    setShowMenu,
    hideButtons,
    setHideButtons,
    toggleButtonsVisibility,
  };
};

export const useTimerCountdown = (
  isRunning: boolean,
  timer: [number, number],
  setTimer: (timer: [number, number]) => void,
  setRunning: (running: boolean) => void
) => {
  useEffect(() => {
    if (isRunning) {
      const startTime = new Date();

      const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = Math.floor(
          (currentTime.getTime() - startTime.getTime()) / 1000
        );
        const remainingSeconds = timer[0] * 60 + timer[1] - timeDiff;
        if (remainingSeconds === 0) {
          setTimer([0, 0]);
        } else if (timeDiff >= timer[0] * 60 + timer[1]) {
          setRunning(false);
        } else {
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;
          setTimer([minutes, seconds]);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, timer, setTimer, setRunning]);
};
