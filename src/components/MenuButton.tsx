interface MenuButtonProps {
  hideButtons: boolean;
  showMenu: boolean;
  onClick: () => void;
}

const MenuButton = ({ hideButtons, showMenu, onClick }: MenuButtonProps) => {
  if (hideButtons || showMenu) return null;

  return (
    <div className="absolute top-2 right-0 z-50">
      <button
        onClick={onClick}
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
  );
};

export default MenuButton;
