import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { patchRecommendations } from "@/apis";

import HistoryList from "@/components/HistoryList";
import PastRecommendation from "@/components/recommend/PastRecommendation";
import Recommendation from "@/components/recommend/Recommendation";

import { Movie } from "@/customTypes";

type Recommend = {
  id: number;
  movies: Movie[];
  chatting: string;
};

const HISTORIES = [
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
];

export default function RecommendPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<Recommend>(
    location.state
  );
  const [pastRecoList, setPastRecoList] = useState<Recommend[]>([]);
  const [detail, setDetail] = useState("");
  const [likes, setLikes] = useState([]);
  const [hates, sethates] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };

  const handleSendClick = async () => {
    const id: number = location.state.id;

    const res = await patchRecommendations(id, {
      recommendation_id: id,
      likes: likes.join(";"),
      hates: hates.join(";"),
      detail: detail,
    });
    setPastRecoList((prev) => [...prev, recommendation]);
    setRecommendation({ ...res, chatting: detail });
  };

  const handleDoneClick = () => {
    navigate("/result");
  };

  return (
    <div className="relative min-h-full min-w-fit pt-[110px] pb-[140px] bg-[url('src/assets/beige_background.png')]">
      <div className="px-[120px] w-fit mx-auto">
        <div className="flex flex-col gap-20">
          {pastRecoList.map((pastRecos) => (
            <PastRecommendation
              chatting={pastRecos.chatting}
              movies={pastRecos.movies}
            />
          ))}
          <Recommendation
            chatting={recommendation.chatting}
            movies={recommendation.movies}
          />
        </div>
        <DoneButton onClick={handleDoneClick} />
        <ChattingInput
          value={detail}
          onChange={handleInputChange}
          onClickSend={handleSendClick}
        />
      </div>
      <HistoryList histories={HISTORIES} />
    </div>
  );
}

function DoneButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="ml-auto my-5 flex items-center gap-1 py-2.5 pl-5 pr-4 bg-brown-700 rounded-3xl text-white"
      onClick={onClick}
    >
      <span className="text-[15px] font-semibold">이제 좋아요</span>
      <span className="material-symbols-outlined font-light">check</span>
    </button>
  );
}

function ChattingInput({
  value,
  onChange,
  onClickSend,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSend: () => void;
}) {
  return (
    <div className="w-full flex gap-4 justify-center">
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        id="description"
        placeholder="마음에 들 때까지 대화를 이어가보세요."
        className="w-[70%] max-w-[680px] h-[60px] border rounded-[22px] border-beige-dark placeholder:text-beige-dark outline-none p-4 resize-none"
      />
      <button onClick={onClickSend}>
        <span className="material-symbols-outlined font-light text-neutral-500 text-4xl">
          send
        </span>
      </button>
    </div>
  );
}
