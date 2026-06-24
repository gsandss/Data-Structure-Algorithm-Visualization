import React from "react";
import { useNavigate } from "react-router-dom";
import SortingVisualizer from "../components/SortingVisualizer";

const cardStyle = {
  fontSize: "18px",
  paddingLeft: "60px",
  paddingRight: "60px",
  maxWidth: 900,
  margin: "0 auto",
};

const titleStyle = {
  fontSize: "40px",
  display: "table",
  borderBottom: "2px solid grey",
  paddingBottom: "8px",
  margin: "10px auto 0",
  width: "fit-content",
};

const subsectionStyle = {
  fontSize: "30px",
  display: "table",
  borderBottom: "2px solid grey",
  paddingBottom: "8px",
  margin: "10px auto 0",
  width: "fit-content",
}; 

function AlgorithmPage({ algorithm }) {
  const navigate = useNavigate();

  return (
    <div className="description">
      <div style={{ margin: 12 }}>
        <button onClick={() => navigate('/')} style={{ padding: '6px 10px' }}>Back</button>
      </div>

      <h1 style={titleStyle}>{algorithm.title}</h1>

      <p style={cardStyle}>{algorithm.description}</p>

      <section style={{ display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'center', marginTop: 12 }}>
        <div style={{ width: 740 }}>
          <SortingVisualizer algorithm={algorithm} />
        </div>
      </section>
      <div className="steps" style={{ maxWidth: 740, margin: '24px auto' }}>
        <h2 style={subsectionStyle}>How it Works</h2>
        {algorithm.steps && algorithm.steps.length > 0 ? (
          <ol style={{ marginTop: 16, lineHeight: 1.7 }}>
            {algorithm.steps.map((step, index) => (
              <li key={index} style={{ marginBottom: 12 }}>
                {step}
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ marginTop: 16 }}>A step-by-step explanation has not been added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AlgorithmPage;