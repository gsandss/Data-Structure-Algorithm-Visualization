import Card from "./Card";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Gifs
import insertionSortGif from "./assets/insertion.gif";
import selectionSortGif from "./assets/selection.gif";
import bubbleSortGif from "./assets/bubble.gif";
import mergeSortGif from "./assets/merge.gif";
import quickSortGif from "./assets/quick.gif";

// Pages
import SelectionSortPage from "./pages/SelectionSort.jsx"
import InsertionSortPage from "./pages/InsertionSort.jsx"
import BubbleSortPage from "./pages/BubbleSort.jsx"
import MergeSortPage from "./pages/MergeSort.jsx"
import QuickSortPage from "./pages/QuickSort.jsx"

function App() {

  const algorithms = [
    {title: "Insertion Sort", gif : insertionSortGif, path: "insertion-sort"},
    {title: "Selection Sort", gif : selectionSortGif, path: "selection-sort"},
    {title: "Quick Sort", gif : quickSortGif, path: "quick-sort"},
    {title: "Merge Sort", gif : mergeSortGif, path: "merge-sort"},
    {title: "Bubble Sort", gif : bubbleSortGif, path: "bubble-sort"}
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage algorithms={algorithms} />} />
        <Route path="/insertion-sort" element={<InsertionSortPage />} />
        <Route path="/selection-sort" element={<SelectionSortPage />} />
        <Route path="/bubble-sort" element={<BubbleSortPage />} />
        <Route path="/merge-sort" element={<MergeSortPage />} />
        <Route path="/quick-sort" element={<QuickSortPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage({ algorithms }) {
  return (
    <div className="card-container">
      <div className="card-content">
        {algorithms.map((algo) => (
          <Link key={algo.path} to={algo.path} style={{ textDecoration: "none" }}>
            <Card title={algo.title} gif={algo.gif} />
          </Link>
        ))}
      </div>
    </div>
  );
}



export default App;