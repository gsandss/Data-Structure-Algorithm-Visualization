import Card from "./Card";
import { Routes, Route, Link } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage";
import StructurePage from "./pages/StructurePage";
import { algorithms as algorithmsData } from "./data/algorithms";
import { linearStructures as linearStructuresData } from "./data/linearStructures";
import { nonLinearStructures as nonLinearStructuresData } from "./data/nonLinearStructures";

// Gifs
  // Structures
import insertionSortGif from "./assets/insertion.gif";
import selectionSortGif from "./assets/selection.gif";
import bubbleSortGif from "./assets/bubble.gif";
import mergeSortGif from "./assets/merge.gif";
import quickSortGif from "./assets/quick.gif";

  //Linear Structures

  // Non-Linear Structures

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
    path,
    gif: gifMap[key],
    description: meta.description,
    timeComplexity: meta.timeComplexity,
    spaceComplexity: meta.spaceComplexity,
  };
});

const linearStructures = Object.keys(linearStructuresData).map((key) => {
  const meta = linearStructuresData[key];
  const path = "/" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return {
    title: meta.name,
    path,
    description: meta.description,
  };
});

const nonLinearStructures = Object.keys(nonLinearStructuresData).map((key) => {
  const meta = nonLinearStructuresData[key];
  const path = "/" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return {
    title: meta.name,
    path,
    description: meta.description,
  };
});

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            algorithms={algorithms}
            linearStructures={linearStructures}
            nonLinearStructures={nonLinearStructures}
          />
        }
      />

      {algorithms.map((algo) => (
        <Route
          key={algo.path}
          path={algo.path}
          element={<AlgorithmPage algorithm={algo} />}
        />
      ))}

      {linearStructures.map((structure) => (
        <Route
          key={structure.path}
          path={structure.path}
          element={<StructurePage structure={structure} />}
        />
      ))}

      {nonLinearStructures.map((structure) => (
        <Route
          key={structure.path}
          path={structure.path}
          element={<StructurePage structure={structure} />}
        />
      ))}
    </Routes>
  );
}

function HomePage({ algorithms = [], linearStructures = [], nonLinearStructures = [] }) {
  return (
    <div className="home-page">
      <section className="card-section">
        <h2 className="section-title">Sorting Algorithms</h2>
        <div className="card-grid">
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
      </section>

      <hr className="section-divider" />

      <section className="card-section">
        <h2 className="section-title">Linear Structures</h2>
        <div className="card-grid">
          {linearStructures.map((structure) => (
            <Link key={structure.path} to={structure.path} style={{ textDecoration: "none" }}>
              <Card title={structure.title} description={structure.description} />
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="card-section">
        <h2 className="section-title">Non-Linear Structures</h2>
        <div className="card-grid">
          {nonLinearStructures.map((structure) => (
            <Link key={structure.path} to={structure.path} style={{ textDecoration: "none" }}>
              <Card title={structure.title} description={structure.description} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;