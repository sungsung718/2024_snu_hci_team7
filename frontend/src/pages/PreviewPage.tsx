import { getPreviewMovies } from "@/apis";
import Loading from "@/components/common/Loading";
import MovieCard from "@/components/preview/MovieCard";
import { Movie } from "@/customTypes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function PreviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["preview"],
    queryFn: getPreviewMovies,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#f1f1f1] flex flex-col items-center">
      <div className="text-2xl pt-24 flex justify-center pb-12">
        미리 둘러볼까요?
      </div>
      <div className="flex flex-col gap-9 w-full">
        <Movies movies={data!.latest} category="최신 영화" />
        <Movies movies={data!.classic} category="꾸준히 사랑받는 영화" />
      </div>
      <StartButton />
    </div>
  );
}

function Movies({ movies, category }: { movies: Movie[]; category: string }) {
  return (
    <div className="bg-white flex flex-col items-center py-6 px-14">
      <div>
        <div className="text-[18px] mb-[14px]">{category}</div>
        <div className="flex flex-wrap items-center gap-10">
          {movies.map((movie, i) => (
            <MovieCard movie={movie} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StartButton() {
  return (
    <Link
      to={"/inquiry"}
      className="pb-28 pt-[72px] flex items-center justify-center gap-1"
    >
      <span className="text-lg">시작하기</span>
      <span className="material-symbols-outlined text-5xl font-extralight">
        arrow_right_alt
      </span>
    </Link>
  );
}
