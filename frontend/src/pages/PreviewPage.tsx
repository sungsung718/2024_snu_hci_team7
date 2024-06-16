import { getPreviewMovies } from "@/apis";
import Loading from "@/components/common/Loading";
import MovieCard from "@/components/preview/MovieCard";
import { Movie } from "@/customTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactModal from "react-modal";
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
    <div className="relative min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <ReactModal
        isOpen
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          content: {
            width: "fit-content",
            position: "absolute",
            top: "40px",
            left: "50vw",
            justifyContent: "center",
            transform: "translateX(-50%)",
            border: "none",
            background: "rgba(0, 0, 0, 0.2)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div className="bg-[#F5F0EA] flex flex-col items-center w-[1000px] px-14">
          <div className="font-nanumpen text-[20px] pt-[80px] flex justify-center pb-[18px]">
            영화 취향을 알고 있나요?
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
      </ReactModal>
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
    <div className="bg-white flex flex-col items-center py-6 px-">
      <div>
        <div className="text-[12px] text-[#726E6B] font-semibold mb-2.5">
          {category}
        </div>
        <div className="flex flex-wrap items-center gap-6">
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
      className="pb-14 mt-10 flex items-center justify-center gap-1"
    >
      <span className="text-lg pt-[3px]">시작하기</span>
      <span className="material-symbols-outlined text-4xl font-extralight">
        arrow_right_alt
      </span>
    </Link>
  );
}
