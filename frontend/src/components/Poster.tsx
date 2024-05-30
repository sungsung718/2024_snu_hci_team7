export default function Poster({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-[184px] h-[232px] overflow-hidden center flex justify-center items-center">
      <img src={imageUrl} alt="movie_poster" />
    </div>
  );
}
