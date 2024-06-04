import { Link, useLocation } from "react-router-dom";

import { Movie } from "@/customTypes";
import MovieCard from "@/components/recommend/MovieCard";

export default function ResultPage() {
  const location = useLocation();

  const movies: Movie[] = location.state.movies;
  const history: string[] = location.state.history;

  return (
    <div className="pt-[65px] pb-[100px] min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className="mb-2 w-[1413px] mx-auto px-5">
        <Link to="/">
          <span className="material-symbols-outlined font-light text-[#726E6B] text-[44px]">
            home
          </span>
        </Link>
      </div>
      <div className="relative w-[1413px] h-[724px] p-5 flex mx-auto justify-between items-center bg-[url('src/assets/ticket_background.png')]">
        <div className="divide-y h-full flex flex-col px-[50px] py-[70px] justify-end divide-[rgba(114,_107,_107,_0.3)]">
          {history.map((prompt) => (
            <Prompt content={prompt} />
          ))}
        </div>
        <div className="m-[40px]">
          <Movies movies={movies} />
        </div>
        {/* 추후 구현 */}
        {/* <button className="absolute bottom-[-15px] right-[30px] bg-[#5D544C] rounded-full w-[45px] h-[45px] flex justify-center items-center">
          <span className="material-symbols-outlined text-white font-light">
            download_2
          </span>
        </button> */}
      </div>
    </div>
  );
}

function Prompt({ content }: { content: string }) {
  return (
    <div className="w-[286px] whitespace-nowrap text-ellipsis overflow-hidden py-5 text-[15px] font-medium text-[#726B6B]">
      {content}
    </div>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-[repeat(6,_132px)] grid-rows-[repeat(2,_290px)] gap-x-[14px] gap-y-4">
      {movies.map((movie) => (
        <div className="scale-[0.72] origin-top-left w-fit">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
