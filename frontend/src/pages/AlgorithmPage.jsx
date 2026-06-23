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

        {algorithm.gif ? (
          <div style={{ width: 260, height: 240, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Example</div>
            <img
              src={algorithm.gif}
              alt="example"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default AlgorithmPage;