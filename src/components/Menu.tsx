import React from "react";

interface MenuProps {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  backgroundWarning: boolean;
  setBackgroundWarning: (enabled: boolean) => void;
  backgroundWarningColor: string;
  setBackgroundWarningColor: (color: string) => void;
  backgroundStopColor: string;
  setBackgroundStopColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  restoreDefaults: () => void;
}

const Menu: React.FC<MenuProps> = ({
  showMenu,
  setShowMenu,
  soundEnabled,
  setSoundEnabled,
  backgroundWarning,
  setBackgroundWarning,
  backgroundWarningColor,
  setBackgroundWarningColor,
  backgroundStopColor,
  setBackgroundStopColor,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  restoreDefaults,
}) => (
  <>
    {showMenu && (
      <menu className="menu absolute bottom-0 right-0 top-20 w-[300px] shadow-lg z-10">
        <div className="p-4 bg-white outline drop-shadow-lg rounded-md">
          <h2 className="text-lg font-medium">Timer Options</h2>
          <div>
            <div>
              <input
                type="checkbox"
                id="sound-enabled"
                checked={soundEnabled}
                onChange={e => setSoundEnabled(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="sound-enabled">Enable sound</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="background-warning"
                checked={backgroundWarning}
                onChange={e => setBackgroundWarning(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="background-warning">Background Warning</label>
            </div>
            {backgroundWarning && (
              <div>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={backgroundWarningColor}
                    id="background-warning-color"
                    onChange={e => setBackgroundWarningColor(e.target.value)}
                    className="bg-white"
                  />
                  <label htmlFor="background-warning-color">Background Warning Color</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={backgroundStopColor}
                    id="background-stop-color"
                    onChange={e => setBackgroundStopColor(e.target.value)}
                    className="bg-white"
                  />
                  <label htmlFor="background-stop-color">Background Stop Color</label>
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center">
                <input
                  type="color"
                  value={textColor}
                  id="text-color"
                  onChange={e => setTextColor(e.target.value)}
                  className="bg-white"
                />
                <label htmlFor="text-color">Text Color</label>
              </div>
              <div className="flex items-center pb-5">
                <input
                  type="color"
                  value={backgroundColor}
                  id="background-color"
                  onChange={e => setBackgroundColor(e.target.value)}
                  className="bg-white"
                />
                <label htmlFor="background-color">Background Color</label>
              </div>
              <button
                className="bg-slate-300 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={restoreDefaults}
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
    )}
  </>
);

export default Menu;
