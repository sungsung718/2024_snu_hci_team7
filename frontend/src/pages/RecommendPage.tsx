import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { postResult, putRecommendations } from "@/apis";

import PastRecommendation from "@/components/recommend/PastRecommendation";
import Recommendation from "@/components/recommend/Recommendation";

import { Movie } from "@/customTypes";
import Loading, { RecommendationSkeleton } from "@/components/common/Loading";

type Recommend = {
  id: number;
  movies: Movie[];
  chatting: string;
};

export default function RecommendPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const [recommendation, setRecommendation] = useState<Recommend>(
    location.state
  );
  const [pastRecoList, setPastRecoList] = useState<Recommend[]>([]);
  const [detail, setDetail] = useState("");
  const [likes, setLikes] = useState<string[]>([]);
  const [hates, setHates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };

  const handleReactionClick = (state: "likes" | "hates", word: string) => {
    if (state === "likes") {
      setLikes((prev) => {
        if (prev.includes(word)) {
          return prev.filter((w) => w !== word);
        } else return [...prev, word];
      });
      if (hates.includes(word)) {
        setHates((prev) => prev.filter((w) => w !== word));
      }
    } else {
      setHates((prev) => {
        if (prev.includes(word)) {
          return prev.filter((w) => w !== word);
        } else return [...prev, word];
      });
      if (likes.includes(word)) {
        setLikes((prev) => prev.filter((w) => w !== word));
      }
    }
  };

  const resetAll = () => {
    setDetail("");
    setLikes([]);
    setHates([]);
  };

  const handleSendClick = async () => {
    if (!detail.trim()) {
      alert("채팅을 입력해주세요");
      return;
    }

    try {
      setIsLoading(true);

      const res = await putRecommendations({
        recommendation_id: recommendation.id,
        likes: likes.join(";"),
        hates: hates.join(";"),
        detail,
      });

      console.log(res.movies);

      setPastRecoList((prev) => [...prev, recommendation]);
      setRecommendation({
        ...res,
        chatting: generateChatting(likes, hates, detail),
      });
      resetAll();
      textAreaRef.current?.focus();
    } catch (err) {
      console.log(err);
      alert("에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoneClick = async () => {
    if (detail || likes.length > 0 || hates.length > 0) {
      const confirmed = window.confirm(
        "아직 저장되지 않은 인터랙션이 있습니다. 결과 페이지로 넘어가시겠습니까?"
      );
      if (!confirmed) return;
    }

    const ids = pastRecoList.map((reco) => reco.id);
    ids.push(recommendation.id);
    const idsStr = ids.join(",");

    try {
      setIsFinishing(true);

      const { movies } = await postResult(idsStr);

      const history = pastRecoList.map((reco) => reco.chatting);
      history.push(recommendation.chatting);

      navigate("/result", {
        state: { movies, history },
      });
    } catch (err) {
      console.log(err);
      alert("에러가 발생했습니다.");
    } finally {
      setIsFinishing(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading]);

  return (
    <>
      <div className="relative min-h-full min-w-fit pt-[110px] pb-[80px] bg-[url('src/assets/beige_background.png')]">
        <div className="px-[120px] w-fit mx-auto">
          <div className="flex flex-col gap-20">
            {pastRecoList.map((pastRecos, i) => (
              <PastRecommendation
                chatting={pastRecos.chatting}
                movies={pastRecos.movies}
                key={i}
              />
            ))}
            <Recommendation
              key={recommendation.id}
              chatting={recommendation.chatting}
              movies={recommendation.movies}
              onClickAction={handleReactionClick}
              reaction={{ likes, hates }}
            />
            {isLoading && (
              <div ref={loadingRef}>
                <RecommendationSkeleton />
              </div>
            )}
          </div>
          <DoneButton onClick={handleDoneClick} disabled={isLoading} />
          <ChattingInput
            value={detail}
            onChange={handleInputChange}
            onClickSend={handleSendClick}
            textAreaRef={textAreaRef}
            disabled={isLoading}
          />
          <ReactedWords likes={likes} hates={hates} />
        </div>
      </div>
      {(isLoading || isFinishing) && <Loading />}
    </>
  );
}

function DoneButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className={`ml-auto my-5 flex items-center gap-1 py-2.5 pl-5 pr-4 ${
        disabled && "opacity-30"
      } bg-brown-700 rounded-3xl text-white`}
      onClick={onClick}
      disabled={disabled}
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
  textAreaRef,
  disabled,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSend: () => void;
  textAreaRef: React.LegacyRef<HTMLTextAreaElement>;
  disabled: boolean;
}) {
  return (
    <div className="w-full flex mt-6 gap-4 justify-center">
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        id="description"
        placeholder="마음에 들 때까지 대화를 이어가보세요."
        className="w-[70%] max-w-[680px] h-[60px] border rounded-[22px] border-beige-dark placeholder:text-beige-dark outline-none p-4 resize-none"
        ref={textAreaRef}
      />
      <button onClick={onClickSend} disabled={disabled}>
        <span
          className={`${
            disabled && "opacity-30"
          } material-symbols-outlined text-neutral-500 text-4xl`}
        >
          send
        </span>
      </button>
    </div>
  );
}

function ReactedWords({ likes, hates }: { likes: string[]; hates: string[] }) {
  return (
    <div className="mt-5 w-[700px] mx-auto">
      <div className="mb-2">
        {likes.map((word) => (
          <span className="bg-beige-dark mr-1" key={word}>
            {word}
          </span>
        ))}
      </div>
      <div>
        {hates.map((word) => (
          <span className="line-through mr-1" key={word}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

const generateChatting = (likes: string[], hates: string[], detail: string) => {
  let chatting = "";

  if (likes.length > 0) {
    chatting += `'${likes.join(" / ")}' 같은 부분은 좋아. `;
  }

  if (hates.length > 0) {
    chatting += `'${hates.join(" / ")}' 같은 부분은 별로야. `;
  }

  return chatting + detail;
};
