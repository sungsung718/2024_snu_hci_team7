export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-2xl gap-2 bg-[rgb(195,_189,_184,_0.5)]">
      <div className="animate-spin flex items-center justify-center w-8 h-8 rounded-full border-[7px] border-beige-dark border-t-[#5D544C]"></div>
      <span className="text-[#453e38] font-semibold">
        영화 정보를 불러오고 있습니다
      </span>
    </div>
  );
}
