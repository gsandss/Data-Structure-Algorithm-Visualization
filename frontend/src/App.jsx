import Card from "./Card";
import { Routes, Route, Link } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage";
import { algorithms as algorithmsData } from "./data/algorithms";

// Gifs
import insertionSortGif from "./assets/insertion.gif";
import selectionSortGif from "./assets/selection.gif";
import bubbleSortGif from "./assets/bubble.gif";
import mergeSortGif from "./assets/merge.gif";
import quickSortGif from "./assets/quick.gif";

const gifMap = {
  insertionSort: insertionSortGif,
  selectionSort: selectionSortGif,
  bubbleSort: bubbleSortGif,
  mergeSort: mergeSortGif,
  quickSort: quickSortGif,
};

const algorithms = Object.keys(algorithmsData).map((key) => {
  const meta = algorithmsData[key];
  const path = "/" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return {
    title: meta.name,
    name: meta.name,
    path,
    gif: gifMap[key],
    description: meta.description,
    timeComplexity: meta.timeComplexity,
    spaceComplexity: meta.spaceComplexity,
  };
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage algorithms={algorithms} />} />
      {algorithms.map((algo) => (
        <Route
          key={algo.path}
          path={algo.path}
          element={<AlgorithmPage algorithm={algo} />}
        />
      ))}
    </Routes>
  );
}

function HomePage({ algorithms }) {
  return (
    <div className="card-container">
      <div className="card-content">
        {algorithms.map((algo) => (
          <Link key={algo.path} to={algo.path} style={{ textDecoration: "none" }}>
            <Card
              title={algo.title}
              gif={algo.gif}
              timeComplexity={algo.timeComplexity}
              spaceComplexity={algo.spaceComplexity}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;