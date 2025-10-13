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

const Menu = ({
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
}: MenuProps) => {
  if (!showMenu) return null;

  const handleClose = () => setShowMenu(false);

  return (
    <div className="p-6 bg-white rounded-l-lg shadow-xl h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Timer Options</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Settings Section */}
      <div className="space-y-6">
        {/* Sound Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Sound</h3>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Enable sound when timer ends</span>
          </label>
        </div>

        {/* Background Warning Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Background Warning</h3>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={backgroundWarning}
              onChange={(e) => setBackgroundWarning(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Enable background color changes</span>
          </label>

          {backgroundWarning && (
            <div className="pl-4 space-y-3 border-l-2 border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={backgroundWarningColor}
                  onChange={(e) => setBackgroundWarningColor(e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <label className="text-gray-700">Warning color (last 10 seconds)</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={backgroundStopColor}
                  onChange={(e) => setBackgroundStopColor(e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <label className="text-gray-700">Stop color (time up)</label>
              </div>
            </div>
          )}
        </div>

        {/* Color Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Colors</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <label className="text-gray-700">Text color</label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <label className="text-gray-700">Background color</label>
            </div>
          </div>
        </div>

        {/* Restore Defaults Button */}
        <button
          onClick={restoreDefaults}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Restore Defaults
        </button>
      </div>

      {/* Keyboard Shortcuts Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Keyboard Shortcuts</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">F</span>
            <span>Toggle fullscreen</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">M</span>
            <span>Toggle menu</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">H</span>
            <span>Hide/show buttons</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">R</span>
            <span>Reset timer</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">Space</span>
            <span>Start/stop timer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
