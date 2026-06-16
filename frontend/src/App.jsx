import Card from "./Card";
import insertionSortGif from "./assets/insertion.gif";
import selectionSortGif from "./assets/selection.gif";
import bubbleSortGif from "./assets/bubble.gif";
import mergeSortGif from "./assets/merge.gif";
import quickSortGif from "./assets/quick.gif";

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
          gif = {bubbleSortGif}
        />

        <Card 
          title="Merge Sort"
          gif={mergeSortGif}
        />

        <Card 
          title="Quick Sort"
          gif={quickSortGif}
        />

      </div>
    </div>
  );
}

export default App;