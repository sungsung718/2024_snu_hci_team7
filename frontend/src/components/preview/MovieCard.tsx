import { Movie } from "@/customTypes";

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
    <div className="w-[110px]">
      <div className="grow relative w-[110px] h-[138px] overflow-hidden center flex justify-center items-center">
        <img
          src={movie.image}
          alt="movie_poster"
          width={110}
          className="overflow-hidden"
          // 이미지 화질 개선
          style={{
            imageRendering: "-webkit-optimize-contrast",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      <div className="flex justify-between items-start mt-3.5">
        <div className="text-xs">
          <span>{movie.title}</span>
          <span className="w-4 inline-block">ㆍ</span>
          <span>{movie.year}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleClick("liked")}>
            <span
              className="material-symbols-rounded text-[18px] text-gray-300 font-light"
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
              className="material-symbols-rounded text-[18px] text-gray-300 font-light"
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

      <div className="flex flex-wrap text-xs text-gray-400 mt-1.5 gap-[5px]">
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
