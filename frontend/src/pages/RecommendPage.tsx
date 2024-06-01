import HistoryList from "@/components/HistoryList";
import Recommendation from "@/components/Recommendation";
import { Movie } from "@/customTypes";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate("/result");
  };

  return (
    <div className="relative min-h-full min-w-fit pt-[110px] pb-[140px] bg-[url('src/assets/beige_background.png')]">
      <div className="px-[120px] w-fit mx-auto">
        <div>
          <Recommendation
            chatting={CHATTING}
            movies={[movieMock, movieMock, movieMock, movieMock, movieMock]}
          />
        </div>
        <DoneButton onClick={handleDoneClick} />
        <ChattingInput />
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

function ChattingInput() {
  return (
    <div className="w-full flex gap-4 justify-center">
      <textarea
        name="description"
        id="description"
        placeholder="마음에 들 때까지 대화를 이어가보세요."
        className="w-[70%] max-w-[680px] h-[60px] border rounded-[22px] border-beige-dark placeholder:text-beige-dark outline-none p-4 resize-none"
      />
      <button>
        <span className="material-symbols-outlined font-light text-neutral-500 text-4xl">
          send
        </span>
      </button>
    </div>
  );
}
