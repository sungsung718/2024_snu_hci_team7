import MovieCard from "@/components/MovieCard";
import { Movie } from "@/customTypes";

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
    <div className="bg-gray-300 flex flex-col items-center">
      <div className="text-2xl pt-24 flex justify-center pb-12">
        미리 둘러볼까요?
      </div>
      <div className="flex flex-col gap-9 w-full">
        <div className="bg-white flex flex-col items-center py-6 px-14">
          <div className="flex flex-wrap gap-10 ">
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
          </div>
        </div>

        <div className="bg-white flex flex-col items-center py-6 px-14">
          <div className="flex flex-wrap gap-10">
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
            <MovieCard movie={movieMock} showPreference={true} />
          </div>
        </div>
      </div>

      <button className="pb-28 pt-[72px] flex items-center justify-center gap-1">
        <span className="text-lg">시작하기</span>
        <span className="material-symbols-outlined text-5xl font-extralight">
          arrow_right_alt
        </span>
      </button>
    </div>
  );
}
