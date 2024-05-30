type GanreChipProps = {
  ganre: string;
  selected: boolean;
  onClick: () => void;
};

export default function GanreChip({
  ganre,
  selected,
  onClick,
}: GanreChipProps) {
  const chipStyle = selected
    ? "border-neutral-600 text-white bg-neutral-600"
    : "border-beige-dark";

  return (
    <button
      className={`flex justify-center items-center py-1 px-4 border rounded-[20px] whitespace-nowrap ${chipStyle}`}
      onClick={onClick}
    >
      {ganre}
    </button>
  );
}
