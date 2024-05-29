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
    <div className=" py-52 px-36 flex-col justify-center">
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
        <Span text="좋아하는 감독은" />
        <Input />,
        <Span text="좋아하는 배우는" />
        <Input />.
        <Input />
        <Span text="은/는 재밌게 봤는데" />
        <Input />
        <Span text="은/는 별로였어." />
      </div>
      <div className="flex gap-4 justify-center">
        <input
          type="text"
          className="w-full min-w-[300px] max-w-[680px] h-[60px] border rounded-3xl border-beige-dark outline-none px-4"
        />
        <button>
          <span className="material-symbols-outlined font-extralight text-neutral-600 text-4xl">
            check_circle
          </span>
        </button>
      </div>
    </div>
  );
}

function Input() {
  return (
    <input
      type="text"
      className="outline-none px-2 py-1 bg-transparent border-b-[1.5px] border-beige-dark w-[248px]"
    />
  );
}

function Span({ text }: { text: string }) {
  return <span className="whitespace-nowrap">{text}</span>;
}
