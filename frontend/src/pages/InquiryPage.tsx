import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { postRecommendations } from "@/apis";

import GenreChip from "@/components/GenreChip";
import Loading from "@/components/common/Loading";

const GENRE_LIST = [
  "멜로",
  "코미디",
  "액션",
  "서부극",
  "느와르",
  "스릴러",
  "모험",
  "공포",
  "전쟁",
  "사극",
  "드라마",
  "추리",
  "SF",
  "판타지",
  "애니메이션",
];

type BasicPreference = {
  director: string;
  actor: string;
  liked: string;
  hated: string;
};

export default function InquiryPage() {
  const [genres, setGenres] = useState<{ options: string[]; custom: string }>({
    options: [],
    custom: "",
  });
  const [basicPreference, setBasicPreference] = useState<BasicPreference>({
    director: "",
    actor: "",
    liked: "",
    hated: "",
  });
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleBasicPreferenceInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setBasicPreference((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoneClick = async () => {
    const genreString =
      genres.options + (genres.custom ? "," + genres.custom : "");
    const { actor, director, liked, hated } = basicPreference;

    const likedList = [liked].concat(location.state.liked);
    const hatedList = [hated].concat(location.state.hated);

    const preference = {
      genre: genreString,
      actor,
      director,
      liked: likedList.join(","),
      hated: hatedList.join(","),
      detail,
    };

    const chatting = generateChatting({
      genres: genres.options.concat(genres.custom ? [genres.custom] : []),
      ...basicPreference,
      detail,
    });

    try {
      setIsLoading(true);
      const res = await postRecommendations(preference);
      navigate("/recommend", {
        state: { ...res, chatting },
      });
    } catch (err) {
      console.log(err);
      alert("에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
        <div className=" min-w-[940px] max-w-[1200px] flex flex-col justify-center items-center mx-auto px-[120px] pt-40 pb-[280px]">
          <FavoriteGanre genres={genres} setGenres={setGenres} />
          <BasicPreferenceInputs
            basicPreference={basicPreference}
            onChange={handleBasicPreferenceInput}
          />
          <OtherPreference
            value={detail}
            onChangeDetail={(e) => setDetail(e.target.value)}
            onClickDone={handleDoneClick}
          />
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

type FavoriteGanreProps = {
  genres: { options: string[]; custom: string };
  setGenres: React.Dispatch<
    React.SetStateAction<{ options: string[]; custom: string }>
  >;
};

function FavoriteGanre({ genres, setGenres }: FavoriteGanreProps) {
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customGenre, setCustomGenre] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addGenre = (genre: string) => {
    setGenres((prev) => ({ ...prev, options: [...prev.options, genre] }));
  };

  const removeGenre = (genre: string) => {
    setGenres((prev) => ({
      ...prev,
      options: prev.options.filter((g) => g !== genre),
    }));
  };

  const toggleCustom = () => {
    setIsCustomSelected((selected) => {
      setGenres((prev) => ({ ...prev, custom: selected ? "" : customGenre }));
      return !selected;
    });
  };

  return (
    <div className="flex gap-4 mb-[70px]">
      <span className="whitespace-nowrap">내가 좋아하는 장르는</span>
      <div className="flex gap-2 flex-wrap">
        {GENRE_LIST.map((genre) => (
          <GenreChip
            key={genre}
            genre={genre}
            onClick={() => {
              genres.options.includes(genre)
                ? removeGenre(genre)
                : addGenre(genre);
            }}
            selected={genres.options.includes(genre)}
          />
        ))}
        <div className="flex">
          <GenreChip
            key={"기타"}
            genre={"기타"}
            onClick={toggleCustom}
            selected={isCustomSelected}
          />
          {isCustomSelected && (
            <input
              ref={inputRef}
              name="기타"
              value={customGenre}
              onChange={(e) => {
                const { value } = e.target;
                setCustomGenre(value);
                setGenres((prev) => ({ ...prev, custom: value }));
              }}
              placeholder="기타 입력"
              type="text"
              autoFocus
              className="outline-none mx-0 px-2 py-1 bg-transparent border-b-[1.5px] border-beige-dark w-[120px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function BasicPreferenceInputs({
  basicPreference,
  onChange,
}: {
  basicPreference: BasicPreference;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-[128px]">
      <InputWrapper
        label="좋아하는 감독은"
        value={basicPreference.director}
        onChange={onChange}
        name="director"
        labelForward
      />
      <InputWrapper
        label="좋아하는 배우는"
        value={basicPreference.actor}
        onChange={onChange}
        name="actor"
        labelForward
      />
      <InputWrapper
        label="은/는 재밌게 봤는데"
        value={basicPreference.liked}
        onChange={onChange}
        name="liked"
      />
      <InputWrapper
        label="은/는 별로였어."
        value={basicPreference.hated}
        onChange={onChange}
        name="hated"
      />
    </div>
  );
}

function OtherPreference({
  value,
  onChangeDetail,
  onClickDone,
}: {
  value: string;
  onChangeDetail: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDone: () => void;
}) {
  return (
    <div className="w-full flex gap-4 justify-center">
      <textarea
        value={value}
        name="detail"
        id="detail"
        placeholder="그 밖의 취향에 대해 자유롭게 알려주세요. (개봉연도, 러닝타임..)"
        onChange={onChangeDetail}
        className="w-[70%] max-w-[680px] h-[60px] border rounded-3xl border-beige-dark placeholder:text-beige-dark outline-none p-4 resize-none"
      />

      <button onClick={onClickDone}>
        <span className="material-symbols-outlined font-light text-neutral-500 text-4xl">
          check_circle
        </span>
      </button>
    </div>
  );
}

function InputWrapper({
  name,
  value,
  onChange,
  label,
  labelForward,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  labelForward?: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={active ? "" : "opacity-50"}>
      {labelForward && (
        <label htmlFor={name} className="whitespace-nowrap">
          {label}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={() => {
          if (!value) setActive(false);
        }}
        className="outline-none mx-2 px-2 py-1 bg-transparent border-b-[1.5px] border-beige-dark w-[248px]"
      />
      {!labelForward && (
        <label htmlFor={name} className="whitespace-nowrap">
          {label}
        </label>
      )}
    </div>
  );
}

const generateChatting = ({
  genres,
  director,
  actor,
  liked,
  hated,
  detail,
}: {
  genres: string[];
  director: string;
  actor: string;
  liked: string;
  hated: string;
  detail: string;
}) => {
  let chatting = "";

  if (genres.length > 0) {
    chatting = `좋아하는 장르는 ${genres.join(", ")}. `;
  }

  if (director) {
    chatting += `좋아하는 감독은 ${director}. `;
  }

  if (actor) {
    chatting += `좋아하는 배우는 ${actor}. `;
  }

  if (liked) {
    chatting += `재밌게 본 영화는 ${liked}. `;
  }

  if (hated) {
    chatting += `별로였던 영화는 ${hated}. `;
  }

  if (detail) chatting += `그 이외에는 ${detail}`;

  return chatting;
};
