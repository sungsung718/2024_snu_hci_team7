import "./App.css";
import MovieCard from "@/components/MovieCard";
import { Movie } from "./customTypes";

const movieMock: Movie = {
  title: "액션",
  year: 1984,
  // director: "김기덕",
  keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
  // rating: 8.1,
};

function App() {
  return (
    <>
      <p className="bg-slate-500">hi</p>
      <MovieCard movie={movieMock} showPreference={true} />
    </>
  );
}

export default App;
