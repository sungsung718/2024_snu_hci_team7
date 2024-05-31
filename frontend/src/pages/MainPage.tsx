import MovieCard from "@/components/main/MovieCard";
import { Movie } from "@/customTypes";
import { Link } from "react-router-dom";

const movieMock: Movie = {
  title: "액션",
  imageUrl:
    "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
  year: 1984,
  // director: "김기덕",
  keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
  // rating: 8.1,
};

export default function MainPage() {
  return (
    <div className="bg-[#f1f1f1] flex flex-col items-center">
      <div className="text-2xl pt-24 flex justify-center pb-12">
        미리 둘러볼까요?
      </div>
      <div className="flex flex-col gap-9 w-full">
        <Movies
          movies={[movieMock, movieMock, movieMock, movieMock, movieMock]}
          category="최신 영화"
        />
        <Movies
          movies={[movieMock, movieMock, movieMock, movieMock, movieMock]}
          category="꾸준히 사랑받는 영화"
        />
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
          {movies.map((movie) => (
            <MovieCard movie={movie} />
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
