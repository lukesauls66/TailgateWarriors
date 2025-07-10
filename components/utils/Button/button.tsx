interface ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  name: string;
  width?: string;
}

export default function Button({
  type = "button",
  onClick,
  name,
  width = "w-full",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width} bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer text-background font-semibold p-4 border-b-tw-dark-red border-b-4`}
    >
      {name}
    </button>
  );
}
