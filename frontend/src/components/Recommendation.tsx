import { Movie } from "@/customTypes";
import Poster from "./Poster";
import SwipeDown from "@/assets/swipe_down.svg?react";

type RecommendationProps = {
  chatting: string;
  movies: Movie[];
};

export default function Recommendation({
  chatting,
  movies,
}: RecommendationProps) {
  return (
    <div className="flex flex-col items-center mb-5 w-[1000px] mx-auto">
      <Chatting content={chatting} />
      <div className="mr-auto pl-3 flex gap-1 items-center mt-[56px] mb-4 text-[rgba(202,_138,_138,_0.8)] text-[14px] font-medium">
        <SwipeDown />
        <span>추천의 말을 직접 조작해보세요</span>
      </div>
      <Movies movies={movies} />
      <DoneButton />
    </div>
  );
}

function Chatting({ content }: { content: string }) {
  return (
    <div className="max-w-[612px] w-fit px-7 py-4 border border-dashed border-beige-dark rounded-md text-[rgba(188,_180,_172)]">
      {content}
    </div>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="flex flex-wrap gap-5">
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-[182px] bg-white rounded-lg overflow-hidden shadow-[0px_0px_17.3px_0px_rgba(92,_87,_78,_0.09)]">
      <Description description={movie.reason!} />
      <Poster imageUrl={movie.imageUrl} gradient />
      <BasicInformation
        title={movie.title}
        rating={movie.rating!}
        director={movie.director!}
      />
    </div>
  );
}

function Description({ description }: { description: string }) {
  return (
    <div className="text-[13px] text-brown-700 p-[14px]">{description}</div>
  );
}

function BasicInformation({
  title,
  rating,
  director,
}: {
  title: string;
  rating: number;
  director: string;
}) {
  return (
    <div className="bg-brown-400 px-3 pt-2.5 py-3">
      <div className="flex justify-between">
        <Title title={title} />
        <Rating rating={rating} />
      </div>
      <Director director={director} />
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <span className="whitespace-nowrap text-ellipsis overflow-hidden text-[17px] text-white font-semibold">
      {title}
    </span>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center text-brown-200">
      <span className="material-symbols-rounded">star</span>
      {rating ?? 0}
    </span>
  );
}

function Director({ director }: { director: string }) {
  return (
    <div className="text-[13px] text-white opacity-[0.6] font-light">
      {director}
    </div>
  );
}

function DoneButton() {
  return (
    <button className="ml-auto mt-5 flex items-center gap-1 py-2.5 pl-5 pr-4 bg-brown-700 rounded-3xl text-white">
      <span className="text-[15px] font-semibold">이제 좋아요</span>
      <span className="material-symbols-outlined font-light">check</span>
    </button>
  );
}
