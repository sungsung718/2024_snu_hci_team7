import GanreChip from "@/components/GenreChip";

const GANRE_LIST = [
  "멜로",
  "코미디",
  "액션",
  "서부극",
  "갱스터",
  "느와르",
  "스릴러",
  "미스터리",
  "모험",
  "공포",
  "전쟁",
  "사극",
  "드라마",
  "탐정",
  "SF",
  "판타지",
];

export default function InquiryPage() {
  return (
    <div className="relative min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className=" min-w-[940px] max-w-[1200px] flex flex-col justify-center items-center mx-auto px-[120px] pt-40 pb-[280px]">
        <div className="flex gap-4 mb-[70px]">
          <span className="whitespace-nowrap">내가 좋아하는 장르는</span>
          <div className="flex gap-2 flex-wrap">
            {GANRE_LIST.map((ganre, i) => (
              <GanreChip
                ganre={ganre}
                onClick={() => {}}
                selected={Boolean(i % 2)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 flex-wrap mb-[128px]">
          <div>
            <Span text="좋아하는 감독은" />
            <Input />,
          </div>
          <div>
            <Span text="좋아하는 배우는" />
            <Input />.
          </div>
          <div>
            <Input />
            <Span text="은/는 재밌게 봤는데" />
          </div>
          <div>
            <Input />
            <Span text="은/는 별로였어." />
          </div>
        </div>
        <div className="w-full flex gap-4 justify-center">
          <textarea
            name="description"
            id="description"
            placeholder="그 밖의 취향에 대해 자유롭게 알려주세요. (개봉연도, 러닝타임..)"
            className="w-[70%] max-w-[680px] h-[60px] border rounded-3xl border-beige-dark outline-none p-4 resize-none"
          />
          <button>
            <span className="material-symbols-outlined font-extralight text-neutral-500 text-4xl">
              check_circle
            </span>
          </button>
        </div>
      </div>
      <button className="absolute left-[80px] bottom-[120px]">
        <span className="material-symbols-outlined font-light text-white text-3xl drop-shadow-[0_1px_5px_rgba(51,44,37,0.65)]">
          folder
        </span>
        <span className="material-symbols-outlined font-light text-white text-xl absolute top-[-6px] right-[-12px] drop-shadow-[0_1px_3px_rgba(51,44,37,0.65)]">
          history
        </span>
      </button>
    </div>
  );
}

function Input() {
  return (
    <input
      type="text"
      className="outline-none mx-2 px-2 py-1 bg-transparent border-b-[1.5px] border-beige-dark w-[248px]"
    />
  );
}

function Span({ text }: { text: string }) {
  return <span className="whitespace-nowrap">{text}</span>;
}
