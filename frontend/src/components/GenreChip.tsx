type GenreChipProps = {
  genre: string;
  selected: boolean;
  onClick: () => void;
};

export default function GenreChip({
  genre,
  selected,
  onClick,
}: GenreChipProps) {
  const chipStyle = selected
    ? "border-neutral-600 text-white bg-neutral-600"
    : "border-beige-dark";

  return (
    <button
      className={`flex justify-center items-center py-1 px-4 border rounded-[20px] transition-colors duration-200 whitespace-nowrap ${chipStyle}`}
      onClick={onClick}
    >
      {genre}
    </button>
  );
}
