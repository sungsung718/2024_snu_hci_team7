import { Movie } from "@/customTypes";
import Poster from "../common/Poster";

export default function MovieCard({
  movie,
  editable,
  onClickReaction,
}: {
  movie: Movie;
  editable?: boolean;
  onClickReaction?: (reaction: "likes" | "hates", word: string) => void;
}) {
  return (
    <div className="w-[182px] bg-white rounded-lg overflow-hidden shadow-[0px_0px_17.3px_0px_rgba(92,_87,_78,_0.09)]">
      <Description
        description={movie.detail!}
        editable={editable}
        onClickReaction={onClickReaction}
      />
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
  onClickReaction,
}: {
  description: string;
  editable?: boolean;
  onClickReaction?: (reaction: "likes" | "hates", word: string) => void;
}) {
  if (!editable)
    return (
      <div className="text-[13px] text-brown-700 p-[14px]">{description}</div>
    );

  const words = description.split("/");

  return (
    <div className="text-[13px] text-brown-700 p-[14px]">
      {words.map((word) => (
        <Word word={word} onClickReaction={onClickReaction!} />
      ))}
    </div>
  );
}

function Word({
  word,
  onClickReaction,
}: {
  word: string;

  onClickReaction: (reaction: "likes" | "hates", word: string) => void;
}) {
  return (
    <span className="bg-slate-400 relative group m-1">
      <ActionBox
        onClickReaction={(reaction: "likes" | "hates") =>
          onClickReaction(reaction, word)
        }
      />
      <span className="group-hover:bg-beige-light cursor-pointer">{word}</span>
    </span>
  );
}

function ActionBox({
  onClickReaction,
}: {
  onClickReaction: (reaction: "likes" | "hates") => void;
}) {
  return (
    <div
      className={`absolute group-hover:flex gap-1 hidden top-[-30px] bg-beige-light`}
    >
      <span
        className="cursor-pointer material-symbols-outlined text-gray-300 font-extralight"
        onClick={() => onClickReaction("likes")}
      >
        thumb_up
      </span>
      <span
        className="cursor-pointer material-symbols-outlined text-gray-300 font-light"
        onClick={() => onClickReaction("hates")}
      >
        thumb_down
      </span>
    </div>
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
