import { useReducer } from "react";

type HistoryListType = {
  histories: string[];
};

export default function HistoryList({ histories }: HistoryListType) {
  const [showHistory, toggleHistory] = useReducer((x) => !x, false);

  return (
    <div className="absolute bottom-[120px] left-[80px]">
      <ul
        className={`${showHistory ? "flex" : "hidden"} flex-col gap-[6px] mb-5`}
      >
        {histories.map((history) => (
          <History history={history} />
        ))}
      </ul>
      <button className="relative" onClick={toggleHistory}>
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

function History({ history }: { history: string }) {
  return (
    <li className="w-[344px] py-1 px-4 rounded-2xl bg-beige-light text-beige-dark shadow-[0px_3px_7px_0px_rgba(51,_44,_37,_0.20)] whitespace-nowrap text-ellipsis overflow-hidden">
      {history}sdfsdfsdf
    </li>
  );
}
