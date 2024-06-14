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

export function RecommendationSkeleton() {
  return (
    <div className="animate-pulse mb-4">
      <div className="rounded-md bg-brown-200 h-16 w-[540px] mb-14 mx-auto"></div>
      <div className="flex gap-5 px-5">
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </div>
    </div>
  );
}

function MovieCardSkeleton() {
  return (
    <div className=" rounded-md h-[408px] w-[182px]">
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-3 mb-3"></div>
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-3 my-3"></div>
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-3 my-3"></div>
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-3 w-[40%] mt-3 mb-7"></div>

      <div className="rounded-sm bg-brown-200 w-[182px] h-[229px] mb-5"></div>
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-3 my-3"></div>
      <div className="rounded-md bg-brown-200 h-3 ml-1 mr-8 w-[70%] my-3"></div>
    </div>
  );
}
