import GanreChip from "@/components/GenreChip";
import HistoryList from "@/components/HistoryList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GANRE_LIST = [
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
];

const HISTORIES = [
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  // "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
];

type BasicPreference = {
  director: string;
  actor: string;
  liked: string;
  hated: string;
};

export default function InquiryPage() {
  const [ganres, setGanres] = useState<string[]>([]);
  const [basicPreference, setBasicPreference] = useState<BasicPreference>({
    director: "",
    actor: "",
    liked: "",
    hated: "",
  });
  const [detail, setDetail] = useState("");

  const navigate = useNavigate();

  const handleBasicPreferenceInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setBasicPreference((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoneClick = () => {
    navigate("/recommend");
  };

  return (
    <div className="relative min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className=" min-w-[940px] max-w-[1200px] flex flex-col justify-center items-center mx-auto px-[120px] pt-40 pb-[280px]">
        <FavoriteGanre ganres={ganres} setGanres={setGanres} />
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
      <HistoryList histories={HISTORIES} />
    </div>
  );
}

type FavoriteGanreProps = {
  ganres: string[];
  setGanres: React.Dispatch<React.SetStateAction<string[]>>;
};

function FavoriteGanre({ ganres, setGanres }: FavoriteGanreProps) {
  const addGanre = (ganre: string) => {
    setGanres((prev) => [...prev, ganre]);
  };

  const removeGanre = (ganre: string) => {
    setGanres((prev) => prev.filter((g) => g !== ganre));
  };

  return (
    <div className="flex gap-4 mb-[70px]">
      <span className="whitespace-nowrap">내가 좋아하는 장르는</span>
      <div className="flex gap-2 flex-wrap">
        {GANRE_LIST.map((ganre) => (
          <GanreChip
            ganre={ganre}
            onClick={() => {
              ganres.includes(ganre) ? removeGanre(ganre) : addGanre(ganre);
            }}
            selected={ganres.includes(ganre)}
          />
        ))}
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
      <div>
        <Span text="좋아하는 감독은" />
        <Input
          name="director"
          value={basicPreference.director}
          onChange={onChange}
        />
        ,
      </div>
      <div>
        <Span text="좋아하는 배우는" />
        <Input name="actor" value={basicPreference.actor} onChange={onChange} />
        .
      </div>
      <div>
        <Input name="liked" value={basicPreference.liked} onChange={onChange} />
        <Span text="은/는 재밌게 봤는데" />
      </div>
      <div>
        <Input name="hated" value={basicPreference.hated} onChange={onChange} />
        <Span text="은/는 별로였어." />
      </div>
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
        <span className="material-symbols-outlined font-extralight text-neutral-500 text-4xl">
          check_circle
        </span>
      </button>
    </div>
  );
}

function Input({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="outline-none mx-2 px-2 py-1 bg-transparent border-b-[1.5px] border-beige-dark w-[248px]"
    />
  );
}

function Span({ text }: { text: string }) {
  return <span className="whitespace-nowrap">{text}</span>;
}
