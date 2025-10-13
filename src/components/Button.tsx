import { PropsWithChildren } from "react";
import classnames from "classnames";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  textColor?: string;
  disabled?: boolean;
}

const Button = ({
  className = "",
  onClick,
  children,
  textColor = "#FFFFFF",
  disabled = false
}: PropsWithChildren<ButtonProps>) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={classnames(
        "bg-white/10 leading-10 rounded-[1vmin] border-none outline-none flex flex-col text-center justify-center cursor-pointer hover:bg-white/40 transition-colors duration-200",
        {
          "opacity-50 cursor-not-allowed hover:bg-white/10": disabled,
        },
        className
      )}
      style={{ color: textColor }}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
