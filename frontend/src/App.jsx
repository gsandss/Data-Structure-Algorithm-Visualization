import Card from "./Card";

function App() {
  return (
    <div className="card-container">
      <div className="flex flex-wrap justify-center">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;