import { Movie } from "@/customTypes";

export default function MovieCard({
  movie,
  showPreference,
}: {
  movie: Movie;
  showPreference: boolean;
}) {
  return (
    <div className="w-[184px]">
      <div className="w-[184px] h-[232px] mb-3.5 bg-slate-300 overflow-hidden center flex justify-center items-center">
        <img src={movie.imageUrl} alt="movie_poster" />
      </div>
      <div>
        <div className="flex justify-between items-start">
          <div className="text-lg">
            <span>{movie.title}</span>
            {movie.year && (
              <>
                <span className="w-4 inline-block">ㆍ</span>
                <span>{movie.year}</span>
              </>
            )}
          </div>
          {showPreference && (
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-gray-300 font-light">
                thumb_up
              </span>
              <span className="material-symbols-outlined text-gray-300 font-light">
                thumb_down
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between text-base text-gray-600">
          {movie.director && <span>{movie.director}</span>}
          {movie.rating !== undefined && <span>{movie.rating ?? 0}</span>}
        </div>
        {movie.keywords?.length && (
          <div className="flex flex-wrap text-sm text-gray-400 mt-1.5">
            {movie.keywords.map((keyword) => (
              <span>{keyword}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
