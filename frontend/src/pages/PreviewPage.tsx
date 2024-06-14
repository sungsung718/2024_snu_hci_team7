import { getPreviewMovies } from "@/apis";
import Loading from "@/components/common/Loading";
import MovieCard from "@/components/preview/MovieCard";
import { Movie } from "@/customTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PreviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["preview"],
    queryFn: getPreviewMovies,
  });
  const [liked, setLiked] = useState<string[]>([]);
  const [hated, setHated] = useState<string[]>([]);

  const handleReactionClick = (state: "liked" | "hated", title: string) => {
    if (state === "liked") {
      setLiked((prev) => {
        if (prev.includes(title)) {
          return prev.filter((w) => w !== title);
        } else return [...prev, title];
      });
      if (hated.includes(title)) {
        setHated((prev) => prev.filter((w) => w !== title));
      }
    } else {
      setHated((prev) => {
        if (prev.includes(title)) {
          return prev.filter((w) => w !== title);
        } else return [...prev, title];
      });
      if (liked.includes(title)) {
        setLiked((prev) => prev.filter((w) => w !== title));
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#f1f1f1] flex flex-col items-center">
      <div className="text-2xl pt-24 flex justify-center pb-12">
        미리 둘러볼까요?
      </div>
      <div className="flex flex-col gap-9 w-full">
        <Movies
          movies={data!.recent_movies}
          category="최신 영화"
          reaction={{ liked, hated }}
          onClickReaction={handleReactionClick}
        />
        <Movies
          movies={data!.classic_movies}
          category="꾸준히 사랑받는 영화"
          reaction={{ liked, hated }}
          onClickReaction={handleReactionClick}
        />
      </div>
      <StartButton preference={{ liked, hated }} />
    </div>
  );
}

function Movies({
  movies,
  category,
  reaction,
  onClickReaction,
}: {
  movies: Movie[];
  category: string;
  reaction: { liked: string[]; hated: string[] };
  onClickReaction: (state: "liked" | "hated", title: string) => void;
}) {
  return (
    <div className="bg-white flex flex-col items-center py-6 px-14">
      <div>
        <div className="text-[18px] mb-[14px]">{category}</div>
        <div className="flex flex-wrap items-center gap-10">
          {movies.map((movie) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              state={
                reaction!.liked.includes(movie.title)
                  ? "liked"
                  : reaction!.hated.includes(movie.title)
                  ? "hated"
                  : "none"
              }
              onClickReaction={onClickReaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StartButton({
  preference,
}: {
  preference: { liked: string[]; hated: string[] };
}) {
  return (
    <Link
      to={"/inquiry"}
      state={preference}
      className="pb-28 pt-[72px] flex items-center justify-center gap-1"
    >
      <span className="text-lg">시작하기</span>
      <span className="material-symbols-outlined text-5xl font-extralight">
        arrow_right_alt
      </span>
    </Link>
  );
}
