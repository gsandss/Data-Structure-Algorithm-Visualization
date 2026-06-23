import React, { useState, useEffect, useRef } from 'react';
import './SortingVisualizer.css';

const DEFAULT_INPUT = '5,3,8,1,4';

export default function SortingVisualizer({ algorithm }) {
  const [inputText, setInputText] = useState(DEFAULT_INPUT);
  const [sessionId, setSessionId] = useState(null);
  const [simState, setSimState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [swappedIndices, setSwappedIndices] = useState([]);
  const prevArrayRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  function parseArray(text) {
    return text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);
  }

  async function startSession(arr) {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/sorting/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithm: algorithm.id, array: arr }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to start');
      setSessionId(data.id);
      prevArrayRef.current = data.state.array ? Array.from(data.state.array) : null;
      setSimState(data.state);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStart() {
    const arr = parseArray(inputText);
    await startSession(arr);
  }

  async function handleStep() {
    if (!sessionId) return alert('Start a session first');
    setLoading(true);
    try {
      // capture previous array before requesting next state
      prevArrayRef.current = simState && simState.array ? Array.from(simState.array) : prevArrayRef.current;
      const resp = await fetch(`${API_BASE}/api/sorting/${sessionId}/step`, { method: 'POST' });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed');
      setSimState(data.state);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!simState) return;
    const lastSwapped = simState.lastSwapped;
    if (lastSwapped && prevArrayRef.current) {
      const [aIdx, bIdx] = lastSwapped;
      const aVal = prevArrayRef.current[aIdx];
      const bVal = prevArrayRef.current[bIdx];
      setSwapMessage(`Swapped ${aVal} and ${bVal}`);
      setSwappedIndices([aIdx, bIdx]);
      // clear after animation
      const t = setTimeout(() => {
        setSwapMessage('');
        setSwappedIndices([]);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [simState]);

  function renderBars() {
    if (!simState || !Array.isArray(simState.array)) return null;
    const arr = simState.array;
    const max = Math.max(...arr, 1);
    const lastCompared = simState.lastCompared || [];

    return (
      <div className="sv-bars">
        {arr.map((v, idx) => {
          const isCompared = lastCompared.includes(idx);
          const isSwapped = swappedIndices.includes(idx);
          const h = Math.round((v / max) * 160) + 24; // height px
          let cls = 'sv-bar';
          if (isSwapped) cls += ' swap-anim';
          else if (isCompared) cls += ' compared';
          return (
            <div key={idx} className={cls} style={{ height: `${h}px` }}>
              <div className="sv-value">{v}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="sv-root">
      <div className="sv-controls">
        <input
          aria-label="array"
          className="sv-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="sv-buttons">
          <button onClick={handleStart} disabled={loading}>Start</button>
          <button onClick={handleStep} disabled={loading || !sessionId}>Step</button>
        </div>
      </div>

      <div className="sv-visual">
        {renderBars()}
        {simState && simState.finished ? <div className="sv-finished">Finished</div> : null}
        {swapMessage ? <div className="sv-message">{swapMessage}</div> : null}
      </div>
    </div>
  );
}
