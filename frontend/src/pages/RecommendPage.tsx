import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { patchRecommendations } from "@/apis";

import HistoryList from "@/components/HistoryList";
import PastRecommendation from "@/components/recommend/PastRecommendation";
import Recommendation from "@/components/recommend/Recommendation";

import { Movie } from "@/customTypes";

const HISTORIES = [
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  // "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
  "history1 뭐 표시하지,,,,,,,,,,,,,,,,,,,날짜나 프롬프트 일부",
];

const movieMock: Movie = {
  title: "액션",
  image:
    "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
  director: "김기덕",
  rating: 8.1,
  detail:
    "이 영화는 미묘한 감정과 캐릭터의 심리를 섬세하게 그려내어 당신의 호감을 사로잡을 것입니다.",
};

const CHATTING =
  "나는 로맨스나 코미디 또는 예술적인 영화를 좋아하고, 공포 스릴러 범죄 영화는 절대 보지 않아. 가장 인상깊게 본 영화는 최근에 개봉했던 일본 영화 '괴물'이야. ";

export default function RecommendPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<{
    id: number;
    movies: Movie[];
  }>(location.state);
  const [pastMoviesList, setPastMovies] = useState<Movie[][]>([]);
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

    setPastMovies((prev) => [...prev, recommendation.movies]);
    setRecommendation(res);
  };

  const handleDoneClick = () => {
    navigate("/result");
  };

  return (
    <div className="relative min-h-full min-w-fit pt-[110px] pb-[140px] bg-[url('src/assets/beige_background.png')]">
      <div className="px-[120px] w-fit mx-auto">
        <div className="flex flex-col gap-20">
          {pastMoviesList.map((pastMovies) => (
            <PastRecommendation chatting={CHATTING} movies={pastMovies} />
          ))}
          <Recommendation chatting={CHATTING} movies={recommendation.movies} />
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
