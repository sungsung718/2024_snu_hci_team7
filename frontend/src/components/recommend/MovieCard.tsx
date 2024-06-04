import { Movie } from "@/customTypes";

import Poster from "../common/Poster";
import { useState } from "react";

export default function MovieCard({
  movie,
  editable,
  onClickReaction,
  reaction,
}: {
  movie: Movie;
  editable?: boolean;
  reaction?: { likes: string[]; hates: string[] };
  onClickReaction?: (reaction: "likes" | "hates", word: string) => void;
}) {
  return (
    <div className="w-[182px] bg-white rounded-lg shadow-[0px_0px_17.3px_0px_rgba(92,_87,_78,_0.09)]">
      <Description
        description={movie.detail!}
        editable={editable}
        onClickReaction={onClickReaction}
        reaction={reaction}
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
  reaction,
  onClickReaction,
}: {
  description: string;
  editable?: boolean;
  reaction?: { likes: string[]; hates: string[] };
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
        <Word
          word={word}
          onClickReaction={(reaction: "likes" | "hates") =>
            onClickReaction!(reaction, word)
          }
          state={
            reaction!.likes.includes(word)
              ? "likes"
              : reaction!.hates.includes(word)
              ? "hates"
              : "none"
          }
        />
      ))}
    </div>
  );
}

function Word({
  word,
  state,
  onClickReaction,
}: {
  word: string;
  state: "likes" | "hates" | "none";
  onClickReaction: (reaction: "likes" | "hates") => void;
}) {
  const [upHover, setUpHover] = useState(false);
  const [downHover, setDownHover] = useState(false);

  return (
    <span className="relative group">
      <div className="absolute group-hover:flex hidden top-[-25px] left-0 bg-beige-light">
        <span
          className={`cursor-pointer material-symbols-rounded text-beige-dark font-light px-0.5`}
          onMouseOver={() => setUpHover(true)}
          onMouseOut={() => setUpHover(false)}
          onClick={() => onClickReaction("likes")}
          style={
            state === "likes" || upHover
              ? { fontVariationSettings: '"FILL" 1' }
              : undefined
          }
        >
          thumb_up
        </span>
        <span
          className="cursor-pointer material-symbols-rounded text-beige-dark font-light px-0.5"
          onClick={() => onClickReaction("hates")}
          onMouseOver={() => setDownHover(true)}
          onMouseOut={() => setDownHover(false)}
          style={
            state === "hates" || downHover
              ? { fontVariationSettings: '"FILL" 1' }
              : undefined
          }
        >
          thumb_down
        </span>
      </div>

      <span
        className={`group-hover:bg-beige-light cursor-pointer 
      ${
        state === "likes"
          ? "bg-beige-dark"
          : state === "hates"
          ? "line-through"
          : ""
      }
      `}
      >
        {word}
      </span>
    </span>
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
    <div className="bg-brown-400 px-3 pt-2.5 py-3 rounded-b-lg">
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
      <span
        className="material-symbols-rounded"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        star
      </span>
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
