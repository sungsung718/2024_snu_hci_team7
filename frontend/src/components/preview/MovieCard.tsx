import { Movie } from "@/customTypes";
import Poster from "../common/Poster";

export default function MovieCard({
  movie,
  state,
  onClickReaction,
}: {
  movie: Movie;
  state: "liked" | "hated" | "none";
  onClickReaction: (state: "liked" | "hated", title: string) => void;
}) {
  const handleClick = (state: "liked" | "hated") => {
    onClickReaction(state, movie.title);
  };

  return (
    <div className="w-[184px]">
      <Poster imageUrl={movie.image} />
      <div className="flex justify-between items-start mt-3.5">
        <div className="text-lg">
          <span>{movie.title}</span>
          <span className="w-4 inline-block">ㆍ</span>
          <span>{movie.year}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleClick("liked")}>
            <span
              className="material-symbols-rounded text-gray-300 font-light"
              style={
                state === "liked"
                  ? { fontVariationSettings: '"FILL" 1' }
                  : undefined
              }
            >
              thumb_up
            </span>
          </button>
          <button onClick={() => handleClick("hated")}>
            <span
              className="material-symbols-rounded text-gray-300 font-light"
              style={
                state === "hated"
                  ? { fontVariationSettings: '"FILL" 1' }
                  : undefined
              }
            >
              thumb_down
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap text-sm text-gray-400 mt-1.5 gap-[5px]">
        {movie
          .hashtags!.slice(1)
          .split("#")
          .map((keyword) => (
            <span key={keyword}>#{keyword}</span>
          ))}
      </div>
    </div>
  );
}
