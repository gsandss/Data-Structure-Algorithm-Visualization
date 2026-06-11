import Card from "./Card";
import insertionSortGif from "./assets/insertion.gif";
import selectionSortGif from "./assets/selection.gif";

function App() {
  return (
    <div class="card-container">
      <div class="card-content">
        <Card 
          title="Insertion Sort"
          gif={insertionSortGif}
        />
        <Card 
          title="Selection Sort" 
          gif={selectionSortGif}
        />
        <Card 
          title="Bubble Sort"
        />

        <Card 
          title="Merge Sort"
        />

        <Card 
          title="Quick Sort"
        />

      </div>
    </div>
  );
}

export default App;