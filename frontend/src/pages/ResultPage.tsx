import { Link, useLocation } from "react-router-dom";

import { Movie } from "@/customTypes";
import MovieCard from "@/components/recommend/MovieCard";
import { useRef } from "react";

export default function ResultPage() {
  const location = useLocation();

  const movies: Movie[] = location.state.movies;
  const history: string[] = [...location.state.history].reverse();

  const ticketRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pt-[65px] flex flex-col items-center pb-[100px] min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className="mb-2 w-[1413px] mx-auto px-5">
        <Link to="/">
          <span className="material-symbols-outlined font-light text-[#726E6B] text-[44px]">
            home
          </span>
        </Link>
      </div>
      <div
        ref={ticketRef}
        className="scale-90 relative w-[1413px] h-[724px] p-5 flex mx-auto justify-between items-center bg-[url('src/assets/ticket_background.png')]"
      >
        <div className="h-full flex items-end px-[50px] py-[70px]">
          <div className="max-h-[350px] overflow-y-auto overflow-x-hidden styled-scrollbar">
            {history.map((prompt, i) => (
              <Prompt content={prompt} key={prompt} isFirst={i === 0} />
            ))}
          </div>
        </div>
        <div className="m-[40px]">
          <Movies movies={movies} />
        </div>
      </div>
    </div>
  );
}

function Prompt({ content, isFirst }: { content: string; isFirst: boolean }) {
  return (
    <>
      {!isFirst && (
        <div className="my-5 border-b border-[rgba(114,_107,_107,_0.3)] w-[120px] h-[1px]" />
      )}
      <div className="w-[286px] max-h-[45px] line-clamp-5 overflow-hidden text-[15px] font-medium text-[#726B6B]">
        {content}
      </div>
    </>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-[repeat(6,_132px)] grid-rows-[repeat(2,_290px)] gap-x-[14px] gap-y-4">
      {movies.map((movie) => (
        <div className="scale-[0.72] origin-top-left w-fit" key={movie.title}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
