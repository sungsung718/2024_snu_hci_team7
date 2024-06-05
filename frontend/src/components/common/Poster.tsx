export default function Poster({
  imageUrl,
  gradient,
}: {
  imageUrl: string;
  gradient?: boolean;
}) {
  return (
    <div className="grow relative w-[182px] h-[229px] overflow-hidden center flex justify-center items-center">
      <img
        src={imageUrl}
        alt="movie_poster"
        width={182}
        // 이미지 화질 개선
        className="overflow-hidden"
        style={{
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
      {gradient && (
        <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,_white_0%,_transparent_30%)]" />
      )}
    </div>
  );
}
