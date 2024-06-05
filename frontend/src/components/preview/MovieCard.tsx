import { Movie } from "@/customTypes";
import Poster from "../common/Poster";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-[184px]">
      <Poster imageUrl={movie.image} />
      <div className="flex justify-between items-start mt-3.5">
        <div className="text-lg">
          <span>{movie.title}</span>
          <span className="w-4 inline-block">ㆍ</span>
          <span>{movie.year}</span>
        </div>
        {/* <div className="flex gap-2">
          <button>
            <span className="material-symbols-outlined text-gray-300 font-light">
              thumb_up
            </span>
          </button>
          <button>
            <span className="material-symbols-outlined text-gray-300 font-light">
              thumb_down
            </span>
          </button>
        </div> */}
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
