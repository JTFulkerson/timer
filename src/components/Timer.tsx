import { useEffect } from "react";
import { useSound } from "use-sound";
import { useLocalStorage } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import MenuButton from "./MenuButton";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { TimerButtonProps } from "./Types";
import { UnitOfTimeT } from "./TimerDisplay";
import {
  useColorSettings,
  useTimerSettings,
  useTimerState,
  useTimerInput,
  useUIState,
  useTimerCountdown,
} from "./hooks/useTimerState";
import { useTimerHotkeys } from "./hooks/useTimerHotkeys";

const DEFAULT_TIMER_BUTTONS: TimerButtonProps[] = [
  { text: "1:00", time: [1, 0] },
  { text: "1:30", time: [1, 30] },
  { text: "2:00", time: [2, 0] },
  { text: "3:00", time: [3, 0] },
];

const Timer = () => {
  // Custom hooks for state management
  const colorSettings = useColorSettings();
  const timerSettings = useTimerSettings();
  const timerState = useTimerState();
  const timerInput = useTimerInput();
  const uiState = useUIState();

  const [play] = useSound("/sounds/time-up.mp3", { volume: 0.25 });

  const [timerButtons, setTimerButtons] = useLocalStorage<TimerButtonProps[]>(
    "timerButtons",
    DEFAULT_TIMER_BUTTONS
  );

  // Custom sound playback function
  const playSound = () => {
    if (timerSettings.customSoundUrl) {
      const audio = new Audio(timerSettings.customSoundUrl);
      audio.volume = 0.25;
      audio.play().catch((error) => console.error("Error playing custom sound:", error));
    } else {
      play();
    }
  };

  // Hotkeys
  useTimerHotkeys({
    timer: timerState.timer,
    typing: timerInput.typing,
    isRunning: timerState.isRunning,
    activeUnitOfTime: timerInput.activeUnitOfTime,
    initTimer: timerState.initTimer,
    stoppedTimer: timerState.stoppedTimer,
    showMenu: uiState.showMenu,
    setRunning: timerState.setRunning,
    setTimer: timerState.setTimer,
    setTyping: timerInput.setTyping,
    setActiveUnitOfTime: timerInput.setActiveUnitOfTime,
    setInitTimer: timerState.setInitTimer,
    setShowMenu: uiState.setShowMenu,
    toggleButtonsVisibility: uiState.toggleButtonsVisibility,
  });

  // Timer countdown
  useTimerCountdown(
    timerState.isRunning,
    timerState.timer,
    timerState.setTimer,
    timerState.setRunning
  );

  // Play sound when timer reaches zero
  useEffect(() => {
    if (
      timerState.timer[0] === 0 &&
      timerState.timer[1] === 0 &&
      timerState.isRunning &&
      timerSettings.soundEnabled
    ) {
      playSound();
    }
  }, [timerState.timer, timerSettings.soundEnabled, timerState.isRunning, timerSettings.customSoundUrl]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (uiState.showMenu) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [uiState.showMenu]);

  // Handlers
  const handleSetActive = (unit: UnitOfTimeT, currentTimer: [number, number]) => {
    timerInput.setActiveUnitOfTime(unit);
    timerState.setStoppedTimer(currentTimer);
  };

  const handleStartStop = () => {
    timerInput.setActiveUnitOfTime(undefined);
    if (timerState.timer[0] || timerState.timer[1]) {
      timerState.setRunning(!timerState.isRunning);
    }
    const newMinute =
      timerInput.typing[0].length === 0
        ? timerState.timer[0]
        : parseInt(timerInput.typing[0]);
    const newSeconds =
      timerInput.typing[1].length === 0
        ? timerState.timer[1]
        : parseInt(timerInput.typing[1]);
    timerState.setInitTimer([newMinute, newSeconds]);
  };

  const handleReset = () => {
    timerInput.setActiveUnitOfTime(undefined);
    timerState.setRunning(false);
    timerState.setTimer(timerState.initTimer);
  };

  const handlePresetClick = (time: [number, number]) => {
    timerInput.setActiveUnitOfTime(undefined);
    timerState.setTimer(time);
    timerState.setInitTimer(time);
    timerState.setRunning(false);
  };

  const handleRestoreDefaults = () => {
    timerSettings.setSoundEnabled(false);
    timerSettings.setCustomSoundUrl("");
    colorSettings.setTextColor("#FFFFFF");
    timerSettings.setBackgroundWarning(true);
    colorSettings.setBackgroundColor("#000000");
    colorSettings.setBackgroundWarningColor("#EAB308");
    colorSettings.setBackgroundStopColor("#8B0000");
    setTimerButtons(DEFAULT_TIMER_BUTTONS);
    uiState.setHideButtons(false);
  };

  const getBackgroundColor = () => {
    if (
      timerState.timer[1] <= 10 &&
      timerState.timer[1] > 0 &&
      timerState.timer[0] === 0 &&
      timerSettings.backgroundWarning
    ) {
      return colorSettings.backgroundWarningColor;
    }
    if (
      timerState.timer[0] === 0 &&
      timerState.timer[1] === 0 &&
      timerSettings.backgroundWarning
    ) {
      return colorSettings.backgroundStopColor;
    }
    return colorSettings.backgroundColor;
  };

  return (
    <>
  <div className="relative z-10">
        <MenuButton
          hideButtons={uiState.hideButtons}
          showMenu={uiState.showMenu}
          onClick={() => uiState.setShowMenu(!uiState.showMenu)}
        />
        <AnimatePresence>
          {uiState.showMenu && (
            <motion.div
              className="fixed top-0 right-0 z-40 w-full max-w-[400px] sm:w-[min(90vw,400px)] h-full sm:h-auto rounded-none sm:rounded-l-lg shadow-lg bg-white"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.25, ease: "easeOut" },
                },
              }}
            >
              <Menu
                showMenu={uiState.showMenu}
                setShowMenu={uiState.setShowMenu}
                soundEnabled={timerSettings.soundEnabled}
                setSoundEnabled={timerSettings.setSoundEnabled}
                customSoundUrl={timerSettings.customSoundUrl}
                setCustomSoundUrl={timerSettings.setCustomSoundUrl}
                backgroundWarning={timerSettings.backgroundWarning}
                setBackgroundWarning={timerSettings.setBackgroundWarning}
                backgroundWarningColor={colorSettings.backgroundWarningColor}
                setBackgroundWarningColor={colorSettings.setBackgroundWarningColor}
                backgroundStopColor={colorSettings.backgroundStopColor}
                setBackgroundStopColor={colorSettings.setBackgroundStopColor}
                textColor={colorSettings.textColor}
                setTextColor={colorSettings.setTextColor}
                backgroundColor={colorSettings.backgroundColor}
                setBackgroundColor={colorSettings.setBackgroundColor}
                restoreDefaults={handleRestoreDefaults}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <main
        className="flex flex-col min-h-screen w-full px-2 sm:px-0 sm:items-center sm:justify-between justify-between"
        style={{ backgroundColor: getBackgroundColor() }}
      >
  <div className="flex flex-col items-center flex-1 justify-center min-h-0 w-full h-full">
          <TimerDisplay
            timer={timerState.timer}
            typing={timerInput.typing}
            activeUnitOfTime={timerInput.activeUnitOfTime}
            hideButtons={uiState.hideButtons}
            textColor={colorSettings.textColor}
            onSetActive={handleSetActive}
          />
        </div>
        <div className="flex flex-col items-center pb-8 sm:pb-16 w-full">
          <TimerControls
            isRunning={timerState.isRunning}
            hideButtons={uiState.hideButtons}
            textColor={colorSettings.textColor}
            timerButtons={timerButtons}
            onStartStop={handleStartStop}
            onReset={handleReset}
            onPresetClick={handlePresetClick}
          />
        </div>
      </main>
    </>
  );
};

export default Timer;
