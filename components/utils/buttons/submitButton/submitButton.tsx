interface SubmitButtonProps {
  type?: "submit";
  onClick?: () => void;
  name: string;
}

export default function SubmitButton({
  type,
  onClick,
  name,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer text-background font-semibold p-4 border-b-tw-dark-red border-b-4"
    >
      {name}
    </button>
  );
}
