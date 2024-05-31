import { Route, Routes } from "react-router-dom";

import InquiryPage from "./pages/InquiryPage";
import PreviewPage from "./pages/PreviewPage";
import RecommendPage from "./pages/RecommendPage";
import ResultPage from "./pages/ResultPage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PreviewPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
