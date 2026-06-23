import Card from "./Card";
import { Routes, Route, Link } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage";
import StructurePage from "./pages/StructurePage";
import { algorithms as algorithmsData } from "./data/algorithms";
import { linearStructures as linearStructuresData } from "./data/linearStructures";
import { nonLinearStructures as nonLinearStructuresData } from "./data/nonLinearStructures";

// Gifs
  // Sorting
  import insertionSortGif from "./assets/sorting/insertion.gif";
  import selectionSortGif from "./assets/sorting/selection.gif";
  import bubbleSortGif from "./assets/sorting/bubble.gif";
  import mergeSortGif from "./assets/sorting/merge.gif";
  import quickSortGif from "./assets/sorting/quick.gif";

  //Linear Structures
  import arrayGif from "./assets/linearStructures/array.png";
  import linkedListGif from "./assets/linearStructures/linkedList.png";
  import queueGif from "./assets/linearStructures/queue.png";
  import stackGif from "./assets/linearStructures/stack.png";
  
  // Non-Linear Structures
  import graphGif from "./assets/nonLinearStructures/graph.png";
  import treeGif from "./assets/nonLinearStructures/tree.png";
  import heapGif from "./assets/nonLinearStructures/heap.png";
  import hashTableGif from "./assets/nonLinearStructures/hashTable.png";
  import hashSetGif from "./assets/nonLinearStructures/hashSet.png"


const gifMap = {
  // Sorting
  insertionSort: insertionSortGif,
  selectionSort: selectionSortGif,
  bubbleSort: bubbleSortGif,
  mergeSort: mergeSortGif,
  quickSort: quickSortGif,

  // Linear Structures
  array: arrayGif,
  stack: stackGif,
  linkedList: linkedListGif,
  queue: queueGif,

  // Non-Linear Structures
  graph: graphGif,
  tree: treeGif,
  heap: heapGif,
  hashTable: hashTableGif,
  hashSet: hashSetGif

};

const algorithms = Object.keys(algorithmsData).map((key) => {
  const meta = algorithmsData[key];
  const path = "/" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const id = key.replace(/Sort$/, '').toLowerCase();
  return {
    id,
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
    gif: gifMap[key]
    
  };
});

const nonLinearStructures = Object.keys(nonLinearStructuresData).map((key) => {
  const meta = nonLinearStructuresData[key];
  const path = "/" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return {
    title: meta.name,
    path,
    description: meta.description,
    gif: gifMap[key]
  };
});

function App() {
  return (
    <div className="app-shell">
      <main className="content">
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
      </main>
    </div>
  );
}

function HomePage({ algorithms = [], linearStructures = [], nonLinearStructures = [] }) {
  return (
    <div className="home-page">
      <section className="card-section">
        <h2 className="section-title">Sorting Algorithms</h2>
        <div className="card-grid">
          {algorithms.map((algo) => (
            <Link key={algo.path} to={algo.path} className="card-link">
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
            <Link key={structure.path} to={structure.path} className="card-link">
              <Card
                title={structure.title}
                description={structure.description}
                gif={structure.gif}
              />
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="card-section">
        <h2 className="section-title">Non-Linear Structures</h2>
        <div className="card-grid">
          {nonLinearStructures.map((structure) => (
            <Link key={structure.path} to={structure.path} className="card-link">
              <Card
                title={structure.title}
                description={structure.description}
                gif={structure.gif}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;