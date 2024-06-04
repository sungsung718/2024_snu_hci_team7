import { useLocation } from "react-router-dom";

import AccountCircle from "@/assets/account_circle.svg?react";

import { Movie } from "@/customTypes";

export default function ResultPage() {
  const location = useLocation();

  return (
    <div className="py-[100px] min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className="w-[1413px] h-[724px] bg-[url('src/assets/ticket_background.png')]"></div>
      {/* <div className="mx-auto px-[76px] pt-[60px] pb-[80px] w-[1225px] shadow-[0px_10px_23px_0px_rgba(0,_0,_0,_0.25)]">
        <ChattingHistory />
        <Movies
          movies={[movieMock, movieMock, movieMock, movieMock, movieMock]}
        />
      </div> */}
    </div>
  );
}

function ChattingHistory() {
  return (
    <div className="flex flex-col gap-5">
      <Chatting
        content="나는 로맨스나 코미디 또는 예술적인 영화를 좋아하고, 공포 스릴러 범죄 영화는 절대 보지 않아.
          가장 인상깊게 본 영화는 최근에 개봉했던 일본 영화 '괴물'이야. "
      />
      <Chatting content="asd" isLast />
    </div>
  );
}

function Chatting({ content, isLast }: { content: string; isLast?: boolean }) {
  return (
    <div className="flex justify-end items-end gap-2">
      <div className="max-w-[612px] w-fit px-7 py-4 border border-neutral-200 rounded-md">
        {content}
      </div>
      {isLast ? <AccountCircle /> : <div className="w-9 h-9" />}
    </div>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="bg-white flex flex-col items-center mt-[80px]">
      <div className="flex flex-wrap gap-10">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-[182px]">
      <Poster imageUrl={movie.image} />
      <Title title={movie.title} />
      {/* undefined 넘어가면 에러 뜨려나 */}
      <DirectorAndRating director={movie.director!} rating={movie.rating!} />
      <Description description={movie.detail!} />
    </div>
  );
}

function Poster({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-[182px] h-[229px] bg-slate-300 overflow-hidden center flex justify-center items-center">
      <img src={imageUrl} alt="movie_poster" />
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <a
      href={`https://search.naver.com/search.naver?query=영화 ${title}`}
      target="_blank"
      className="hover:underline block whitespace-nowrap mt-3 text-ellipsis overflow-hidden text-lg text-blue font-semibold cursor-pointer"
    >
      {title}
    </a>
  );
}

function DirectorAndRating({
  director,
  rating,
}: {
  director: string;
  rating: number;
}) {
  return (
    <div className="flex justify-between text-base text-gray-600 font-light pr-0.5">
      <span>{director}</span>
      <span className="flex items-center">
        <span className="material-symbols-rounded">star</span>
        {rating ?? 0}
      </span>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return <div className="text-[17px] font-light mt-5">{description}</div>;
}
