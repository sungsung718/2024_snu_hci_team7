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
    <div className="flex flex-col w-[182px] h-[408px] bg-white rounded-lg shadow-[0px_0px_17.3px_0px_rgba(92,_87,_78,_0.09)]">
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
        year={movie.year!}
        link={movie.link}
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
  const words = description.split("/");

  return (
    <div className="text-[13px] text-brown-700 p-[14px] min-h-[112px] max-h-[140px]">
      {words.map((word) =>
        editable ? (
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
        ) : (
          <>{word}</>
        )
      )}
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
  year,
  link,
}: {
  title: string;
  rating: number;
  director: string;
  year: number;
  link?: string;
}) {
  return (
    <div className="bg-brown-400 px-3 pt-2.5 py-3 rounded-b-lg">
      <div className="flex justify-between">
        <Title title={title} link={link} />
        <Rating rating={rating} />
      </div>
      <div className="text-[13px] text-white font-light">
        <span className="opacity-[0.6]">{year}</span>
        <span className="mx-1.5 text-[#A0866F]">|</span>
        <span className="opacity-[0.6]">{director}</span>
      </div>
    </div>
  );
}

function Title({ title, link }: { title: string; link?: string }) {
  return link ? (
    <a
      href={link}
      target="_blank"
      className="whitespace-nowrap text-ellipsis underline overflow-hidden text-[17px] text-white font-semibold cursor-pointer"
    >
      {title}
    </a>
  ) : (
    <span className="whitespace-nowrap text-ellipsis overflow-hidden text-[17px] text-white font-semibold">
      {title}
    </span>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center text-brown-200">
      <span
        className="material-symbols-rounded font-extralight"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        star
      </span>
      {rating ?? 0}
    </span>
  );
}
