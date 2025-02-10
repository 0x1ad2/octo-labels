import { useEffect, useState } from "react";
/* @ts-ignore */
import ReactJsonViewCompare from "react-json-view-compare";
import "./App.css";

function App() {
  const [currentData, setCurrentData] = useState(null);
  const [newData, setNewData] = useState(null);
  const [error, setError] = useState(null);

  const loadJsonFiles = async () => {
    try {
      const currentResponse = await fetch(
        "scripts/data/current-github-labels.json"
      );
      const newResponse = await fetch("scripts/data/new-github-labels.json");

      if (!currentResponse.ok || !newResponse.ok) {
        throw new Error("Failed to load JSON files.");
      }

      const currentJson = await currentResponse.json();
      const newJson = await newResponse.json();

      setCurrentData(currentJson);
      setNewData(newJson);
    } catch (err) {
      /* @ts-ignore */
      setError(err.message);
    }
  };

  useEffect(() => {
    loadJsonFiles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentData || !newData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>🐙 Github Labels</h1>
      <ReactJsonViewCompare oldData={currentData} newData={newData} />
    </div>
  );
}

export default App;
