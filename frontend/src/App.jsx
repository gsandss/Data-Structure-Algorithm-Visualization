import Card from "./Card";

function App() {
  return (
    <div className="card-container">
      <div className="flex flex-wrap justify-center">

        <Card 
        title = "Insertion Sort"
        />
        <Card 
        title = "Selection Sort" 
        />
        <Card 
        title = "Bubble Sort"
        />

        <Card 
        title = "Merge Sort"
        />

        <Card 
        title = "Quick Sort"
        />

      </div>
    </div>
  );
}

export default App;