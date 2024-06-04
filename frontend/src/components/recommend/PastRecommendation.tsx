import { Movie } from "@/customTypes";
import Chatting from "./Chatting";
import MovieCard from "./MovieCard";

type RecommendationProps = {
  chatting: string;
  movies: Movie[];
};

export default function PastRecommendation({
  chatting,
  movies,
}: RecommendationProps) {
  return (
    <div className="flex flex-col w-fit items-center mb-5 mx-auto">
      <Chatting content={chatting} />
      <div className="flex gap-5 px-5 mt-10">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.title} />
        ))}
      </div>
    </div>
  );
}
