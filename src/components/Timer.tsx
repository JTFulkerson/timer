"use client";
import classnames from "classnames";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { useSound } from "use-sound";
import { AnimatePresence, motion } from "framer-motion";

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

const Timer = () => {
  const [isRunning, setRunning] = useState(false);
  const [timer, setTimer] = useState<[number, number]>([1, 0]);
  const [initTimer, setInitTimer] = useState<[number, number]>([1, 0]);
  const [stoppedTimer, setStoppedTimer] = useState<[number, number]>([1, 0]);
  const [activeUnitOfTime, setActiveUnitOfTime] = useState<
    UnitOfTimeT | undefined
  >();
  const [typing, setTyping] = useState<[string, string]>(["", ""]);
  const [showMenu, setShowMenu] = useState(false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage(
    "soundEnabled",
    false
  );
  const [backgroundWarning, setBackgroundWarning] = useLocalStorage(
    "backgroundWarning",
    true
  );
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [backgroundWarningColor, setBackgroundWarningColor] =
    useState("#EAB308");
  const [backgroundStopColor, setBackgroundStopColor] = useState("#8B0000");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const [play] = useSound("/sounds/time-up.mp3", { volume: 0.25 });

  const [hideButtons, setHideButtons] = useState(false);

  const toggleButtonsVisibility = () => {
    setHideButtons(!hideButtons);
  };

  type ButtonProps = { className: string; onClick: () => void };
  function Button(props: PropsWithChildren<ButtonProps>) {
    return (
      <div
        tabIndex={-1}
        className={classnames(
          " bg-white/10 leading-10 rounded-[1vmin] border-none outline-none flex flex-col text-center justify-center cursor-pointer hover:bg-white/40",
          props.className
        )}
        style={{ color: textColor }}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          props.onClick();
          if (activeUnitOfTime) {
            setActiveUnitOfTime(undefined);
          }
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          event.preventDefault();
        }}
      >
        {props.children}
      </div>
    );
  }

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

  useEffect(() => {
    if (timer[0] === 0 && timer[1] === 0 && isRunning && soundEnabled) {
      play();
    }
  }, [timer, soundEnabled, play, isRunning]);

  useEffect(() => {
    if (activeUnitOfTime && isRunning) {
      setRunning(false);
    }
  }, [activeUnitOfTime, isRunning]);

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
  }, [isRunning, timer]);

  interface TimerButtonProps {
    text: string;
    time: [number, number];
  }

  const timerButtons: TimerButtonProps[] = [
    {
      text: "1:00",
      time: [1, 0],
    },
    {
      text: "1:30",
      time: [1, 30],
    },
    {
      text: "2:00",
      time: [2, 0],
    },
    {
      text: "3:00",
      time: [3, 0],
    },
  ];

  const handleButtonClick = (time: [number, number]) => {
    setTimer(time);
    setInitTimer(time);
    setRunning(false);
  };

  return (
    <>
      <div className="relative">
        {!hideButtons ? (
          <div className="absolute top-2 right-0">
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => setShowMenu(!showMenu)}
              className="flex items-center px-3 py-2 text-white justify-end"
            >
              <svg
                className="w-10 h-10 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Timer Options</title>
                <path
                  d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : null}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="from-right"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {
                  opacity: 0,
                  x: 50,
                },
                visible: {
                  opacity: 1,
                  x: 5,
                  transition: { duration: 0.25, ease: "easeOut" },
                },
              }}
            >
              <menu className="menu absolute bottom-0 right-0 top-20 w-[300px] shadow-lg z-10">
                <div className="p-4 bg-white outline drop-shadow-lg rounded-md">
                  <h2 className="text-lg font-medium">Timer Options</h2>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        id="sound-enabled"
                        checked={soundEnabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSoundEnabled(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="sound-enabled">Enable sound</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="background-warning"
                        checked={backgroundWarning}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundWarning(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="background-warning">
                        Background Warning
                      </label>
                    </div>
                    {backgroundWarning && (
                      <div>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={backgroundWarningColor}
                            id="background-warning-color"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setBackgroundWarningColor(e.target.value)
                            }
                            className="bg-white"
                          />
                          <label htmlFor="background-warning-color">
                            Background Warning Color
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={backgroundStopColor}
                            id="background-stop-color"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setBackgroundStopColor(e.target.value)
                            }
                            className="bg-white"
                          />
                          <label htmlFor="background-stop-color">
                            Background Stop Color
                          </label>
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={textColor}
                          id="text-color"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)}
                          className="bg-white"
                        />
                        <label htmlFor="text-color">Text Color</label>
                      </div>
                      <div className="flex items-center pb-5">
                        <input
                          type="color"
                          value={backgroundColor}
                          id="background-color"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value)}
                          className="bg-white"
                        />
                        <label htmlFor="background-color">
                          Background Color
                        </label>
                      </div>
                      <button
                        className=" bg-slate-300 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => {
                          setSoundEnabled(false);
                          setTextColor("#FFFFFF");
                          setBackgroundWarning(true);
                          setBackgroundColor("#000000");
                          setBackgroundWarningColor("#EAB308");
                          setBackgroundStopColor("#8B0000");
                        }}
                      >
                        Restore Defaults
                      </button>
                    </div>
                  </div>
                  <div className="outline mt-4 p-4 rounded-md">
                    <h2 className="text-lg font-medium">Keyboard Shortcuts</h2>
                    <p>F - Fullscreen</p>
                    <p>M - Menu</p>
                    <p>H - Hide Buttons</p>
                    <p>R - Reset</p>
                    <p>Space - Start/Stop</p>
                  </div>
                </div>
              </menu>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3vmin",
          height: "100vh",
          backgroundColor:
            timer[1] <= 10 &&
            timer[1] > 0 &&
            timer[0] === 0 &&
            backgroundWarning
              ? backgroundWarningColor
              : timer[0] === 0 && timer[1] === 0 && backgroundWarning
              ? backgroundStopColor
              : backgroundColor,
        }}
      >
        <p
          className={`font-bold text-[44vmin] ${
            hideButtons ? "text-[55vmin]" : ""
          }`}
          style={{ color: textColor }}
        >
          {" "}
          <UnitOfTime
            value={timer[0]}
            typing={typing[0]}
            name="MINUTES"
            active={activeUnitOfTime}
            setActive={(newActive: UnitOfTimeT) => {
              setActiveUnitOfTime(newActive);
              setStoppedTimer(timer);
            }}
          />
          :
          <UnitOfTime
            value={timer[1]}
            typing={typing[1]}
            name="SECONDS"
            active={activeUnitOfTime}
            setActive={(newActive: UnitOfTimeT) => {
              setActiveUnitOfTime(newActive);
              setStoppedTimer(timer);
            }}
          />
        </p>
        {hideButtons ? null : (
          <>
            <div
              className="flex flex-row gap-[3vmin]"
              style={{ visibility: hideButtons ? "hidden" : "visible" }}
            >
              <Button
                className="text-[8vmin] h-[12vmin] w-[24vmin]"
                onClick={() => {
                  if (timer[0] || timer[1]) {
                    setRunning(!isRunning);
                  }
                  const newMinute =
                    typing[0].length === 0 ? timer[0] : parseInt(typing[0]);
                  const newSeconds =
                    typing[1].length === 0 ? timer[1] : parseInt(typing[1]);
                  setInitTimer([newMinute, newSeconds]);
                }}
              >
                {isRunning ? "stop" : "start"}
              </Button>
              <Button
                className="text-[8vmin] h-[12vmin] w-[24vmin]"
                onClick={() => {
                  setRunning(false);
                  setTimer(initTimer);
                }}
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
                  onClick={() => handleButtonClick(time)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Timer;
