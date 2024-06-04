import { useLocation } from "react-router-dom";

import { Movie } from "@/customTypes";
import MovieCard from "@/components/recommend/MovieCard";

export default function ResultPage() {
  const location = useLocation();

  const movies: Movie[] = location.state.movies;
  const history: string[] = location.state.history;

  return (
    <div className="py-[100px] min-h-full min-w-fit flex justify-center items-center bg-[url('src/assets/beige_background.png')]">
      <div className="w-[1413px] h-[724px] p-5 flex justify-between items-center bg-[url('src/assets/ticket_background.png')]">
        <div className="divide-y h-full flex flex-col px-[50px] py-[70px] justify-end divide-[rgba(114,_107,_107,_0.3)]">
          {history.map((prompt) => (
            <Prompt content={prompt} />
          ))}
        </div>
        <div className="m-[40px]">
          <Movies movies={movies} />
        </div>
      </div>
    </div>
  );
}

function Prompt({ content }: { content: string }) {
  return <div className="w-[286px] py-5">{content}</div>;
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
