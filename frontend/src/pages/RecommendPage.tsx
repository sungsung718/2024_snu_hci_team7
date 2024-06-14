import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { postResult, putRecommendations } from "@/apis";

import PastRecommendation from "@/components/recommend/PastRecommendation";
import Recommendation from "@/components/recommend/Recommendation";

import { Movie } from "@/customTypes";
import { RecommendationSkeleton } from "@/components/common/Loading";

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
    if (!detail) {
      alert("채팅을 입력해주세요");
      return;
    }

    try {
      setIsLoading(true);

      await sleep(1000);

      const res = await putRecommendations({
        recommendation_id: recommendation.id,
        likes: likes.join(";"),
        hates: hates.join(";"),
        detail,
      });
      setPastRecoList((prev) => [...prev, recommendation]);
      setRecommendation({ ...res, chatting: detail });
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
      setIsLoading(true);
      const res = await postResult(idsStr);

      res.history.shift();
      if (pastRecoList.length > 0) {
        res.history.unshift(pastRecoList[0].chatting);
      } else {
        res.history.unshift(recommendation.chatting);
      }

      navigate("/result", {
        state: res,
      });
    } catch (err) {
      console.log(err);
      alert("에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading]);

  return (
    <>
      <div className="relative min-h-full min-w-fit pt-[110px] pb-[120px] bg-[url('src/assets/beige_background.png')]">
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

const sleep = (delay: number) =>
  new Promise((reslove) => setTimeout(reslove, delay));
