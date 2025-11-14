interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  name: string;
  width?: string;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  name,
  width = "w-full",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${width} ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer"
      } text-background font-semibold p-4 border-b-tw-dark-red border-b-4 transition-colors`}
    >
      {name}
    </button>
  );
}
