export default function Poster({
  imageUrl,
  gradient,
}: {
  imageUrl: string;
  gradient?: boolean;
}) {
  return (
    <div className="relative w-[182px] h-[229px] overflow-hidden center flex justify-center items-center">
      <img src={imageUrl} alt="movie_poster" />
      {gradient && (
        <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,_white_0%,_transparent_30%)]" />
      )}
    </div>
  );
}
