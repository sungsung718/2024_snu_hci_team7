import AccountCircle from "@/assets/account_circle.svg?react";

export default function ResultPage() {
  return (
    <div className="py-[100px]">
      <div className="text-2xl text-center mb-8">
        영화 취향 결과를 가져왔어요.
      </div>
      <div className="mx-auto px-[76px] pt-[60px] pb-[80px] w-[1225px] h-[300px] shadow-[0px_4px_23.7px_0px_rgba(0,_0,_0,_0.25)]">
        <div className="">
          <Chatting
            content="나는 로맨스나 코미디 또는 예술적인 영화를 좋아하고, 공포 스릴러 범죄 영화는 절대 보지 않아.
          가장 인상깊게 본 영화는 최근에 개봉했던 일본 영화 '괴물'이야. "
          />
          <Chatting content="asd" isLast />
        </div>
      </div>
    </div>
  );
}

function Chatting({ content, isLast }: { content: string; isLast?: boolean }) {
  return (
    <div className="flex justify-end items-end gap-2 mb-5">
      <div className="max-w-[612px] w-fit px-7 py-4 border border-neutral-200 rounded-md">
        {content}
      </div>
      {isLast ? <AccountCircle /> : <div className="w-9 h-9" />}
    </div>
  );
}
