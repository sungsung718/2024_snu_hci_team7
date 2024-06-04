import { Movie } from "@/customTypes";
import SwipeDown from "@/assets/swipe_down.svg?react";
import Chatting from "./Chatting";
import MovieCard from "./MovieCard";

type RecommendationProps = {
  chatting: string;
  movies: Movie[];
  onClickAction: (state: "likes" | "hates", word: string) => void;
  reaction: { likes: string[]; hates: string[] };
};

export default function Recommendation({
  chatting,
  movies,
  reaction,
  onClickAction,
}: RecommendationProps) {
  return (
    <div className="flex flex-col w-fit items-center mb-5 mx-auto">
      <Chatting content={chatting} />
      <div className="mr-auto pl-8 flex gap-1 mt-[54px] mb-4 items-center text-[rgba(202,_138,_138,_0.8)] text-[14px] font-medium">
        <SwipeDown />
        <span>추천의 말을 직접 조작해보세요</span>
      </div>
      <div className="flex gap-5 px-5">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            editable
            onClickReaction={onClickAction}
            reaction={reaction}
          />
        ))}
      </div>
    </div>
  );
}
