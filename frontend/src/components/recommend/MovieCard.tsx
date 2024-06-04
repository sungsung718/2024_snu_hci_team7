import { Movie } from "@/customTypes";
import Poster from "../common/Poster";

export default function MovieCard({
  movie,
  editable,
}: {
  movie: Movie;
  editable?: boolean;
}) {
  return (
    <div className="w-[182px] bg-white rounded-lg overflow-hidden shadow-[0px_0px_17.3px_0px_rgba(92,_87,_78,_0.09)]">
      <Description description={movie.detail!} editable={editable} />
      <Poster imageUrl={movie.image} gradient />
      <BasicInformation
        title={movie.title}
        rating={movie.rating!}
        director={movie.director!}
      />
    </div>
  );
}

function Description({
  description,
  editable,
}: {
  description: string;
  editable?: boolean;
}) {
  if (!editable)
    return (
      <div className="text-[13px] text-brown-700 p-[14px]">{description}</div>
    );

  const words = description.split("/");

  return (
    <div className="text-[13px] text-brown-700 p-[14px]">
      {words.map((word) => (
        <Word word={word} />
      ))}
    </div>
  );
}

function Word({ word }: { word: string }) {
  return <span className="hover:bg-beige-light cursor-pointer">{word}</span>;
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
