import { Link, useLocation } from "react-router-dom";

import { toPng } from "html-to-image";
// import { useScreenshot, createFileName } from "use-react-screenshot";

import { Movie } from "@/customTypes";
import MovieCard from "@/components/recommend/MovieCard";
import { useCallback, useRef } from "react";
import html2canvas from "html2canvas";

export default function ResultPage() {
  const location = useLocation();

  const movies: Movie[] = location.state.movies;
  const history: string[] = [...location.state.history].reverse();

  const ticketRef = useRef<HTMLDivElement>(null);

  // const [image, takeScreenshot] = useScreenshot({
  //   type: "image/jpeg",
  //   quality: 1.0,
  // });

  // const download = (
  //   image: string | null,
  //   { name = "img", extension = "jpg" } = {}
  // ) => {
  //   console.log("downlodad");
  //   console.log(image);
  //   if (!image) return;
  //   const a = document.createElement("a");
  //   a.href = image;
  //   a.download = createFileName(extension, name);
  //   a.click();
  // };

  // const handleSaveAsImage = async () => {
  //   if (!myref || !myref.current) return;
  //   await takeScreenshot(myref.current);
  //   download(image);
  // };

  // const handleSaveAsImage = async () => {
  // alert("Under development");
  // return;
  // };

  // const handleSaveAsImage = useCallback(async () => {
  //   if (ticketRef.current === null) {
  //     alert("이미지를 저장할 수 없습니다.");
  //     return;
  //   }

  //   toPng(ticketRef.current, { cacheBust: true })
  //     .then((dataUrl) => {
  //       const link = document.createElement("a");
  //       link.download = "my-image-name.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [ticketRef]);

  const handleSaveAsImage = () => {
    console.log("Asdfadf");
    if (!ticketRef || !ticketRef.current) return;
    console.log("Asdfadsdfsdfdf");

    html2canvas(ticketRef.current, { proxy: "/html2canvas-proxy" }).then(
      function (canvas) {
        const downloadLink = document.createElement("a");
        downloadLink.download = "filename.png";
        downloadLink.href = canvas.toDataURL();
        downloadLink.click();
      }
    );
  };

  return (
    <div className="pt-[65px] flex flex-col items-center pb-[100px] min-h-full min-w-fit bg-[url('src/assets/beige_background.png')]">
      <div className="mb-2 w-[1413px] mx-auto px-5">
        <Link to="/">
          <span className="material-symbols-outlined font-light text-[#726E6B] text-[44px]">
            home
          </span>
        </Link>
      </div>
      <div
        ref={ticketRef}
        className="relative w-[1413px] h-[724px] p-5 flex mx-auto justify-between items-center bg-[url('src/assets/ticket_background.png')]"
      >
        <div className="h-full flex items-end px-[50px] py-[70px]">
          <div className="max-h-[350px] overflow-y-auto overflow-x-hidden styled-scrollbar">
            {history.map((prompt, i) => (
              <Prompt content={prompt} key={prompt} isFirst={i === 0} />
            ))}
          </div>
        </div>
        <div className="m-[40px]">
          <Movies movies={movies} />
        </div>
      </div>
      {/* <button
        className="bg-[#5D544C] rounded-full mt-10 w-[45px] h-[45px] flex justify-center items-center"
        onClick={handleSaveAsImage}
      >
        <span className="material-symbols-outlined text-white font-light">
          download_2
        </span>
      </button> */}
    </div>
  );
}

function Prompt({ content, isFirst }: { content: string; isFirst: boolean }) {
  return (
    <>
      {!isFirst && (
        <div className="my-5 border-b border-[rgba(114,_107,_107,_0.3)] w-[120px] h-[1px]" />
      )}
      <div className="w-[286px] max-h-[45px] line-clamp-2 overflow-hidden text-[15px] font-medium text-[#726B6B]">
        {content} asdfasdfa asdfasdf asdfasdfas asdfasdfa adsf aasdf adfasdfa
      </div>
    </>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-[repeat(6,_132px)] grid-rows-[repeat(2,_290px)] gap-x-[14px] gap-y-4">
      {movies.map((movie) => (
        <div className="scale-[0.72] origin-top-left w-fit" key={movie.title}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
