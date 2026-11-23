import { useEffect, useState } from 'react'
import { createState, advance } from '../sorting/engine.mjs'

const sample = [6, 3, 8, 4, 7, 2, 5]
const api = import.meta.env.VITE_API_BASE

async function request(path, body) {
  const response = await fetch(api + '/api/sorting/' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok)
    throw new Error(
      'The sorting server could not complete this step. Restart the example to try again.',
    )
  return response.json()
}

function describe(before, after, algorithm) {
  const changed = after.array.findIndex((v, i) => v !== before.array[i])
  let message
  if (after.lastSwapped && changed !== -1) {
    const [a, b] = after.lastSwapped
    message = `Swap ${before.array[a]} and ${before.array[b]}.`
  } else if (algorithm === 'merge') {
    if (before.merging && after.merging)
      message = `Write ${after.array[before.k]} into index ${before.k} from the sorted runs.`
    else if (after.merging)
      message = `Merge the runs spanning indices ${after.leftBound} through ${after.rightBound}.`
    else message = `Prepare the next pair of runs (width ${after.width}).`
  } else if (algorithm === 'insertion' && after.lastMoved) {
    message = `Shift ${before.array[after.lastMoved[0]]} right to make room for ${after.key}.`
  } else if (algorithm === 'insertion' && after.shifting)
    message = `Hold ${after.key} and scan the sorted values to its left.`
  else if (algorithm === 'insertion' && before.shifting)
    message = `Insert ${before.key} at index ${after.insertedIndex}.`
  else if (algorithm === 'selection')
    message =
      after.i === before.i
        ? `Compare ${before.array[before.j]} with the candidate minimum. Current minimum: ${after.array[after.minIndex]}.`
        : 'The minimum is in position. Start the next scan.'
  else if (after.lastCompared) {
    const [a, b] = after.lastCompared
    message =
      algorithm === 'quick'
        ? `Compare ${before.array[a]} with pivot ${after.pivot}.`
        : `Compare ${before.array[a]} and ${before.array[b]}. Keep their order.`
  } else message = 'This pass is complete.'
  return after.finished
    ? (changed !== -1 ? message + ' ' : '') + 'Finished! All values are in ascending order.'
    : message
}

export default function SortingVisualizer({ algorithm, compact = false }) {
  const [input, setInput] = useState(sample.join(', '))
  const [state, setState] = useState(() => createState(algorithm.id, sample))
  const [initial, setInitial] = useState(sample)
  const [behind, setBehind] = useState([])
  const [ahead, setAhead] = useState([])
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('Take the first step to see which values change.')
  const [session, setSession] = useState(null)
  const [busy, setBusy] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  function reset(values) {
    setInitial(values)
    setBehind([])
    setAhead([])
    setState(createState(algorithm.id, values))
    setStep(0)
    setMessage('Ready. Take the first step.')
    setSession(null)
    setPlaying(false)
    setError('')
  }
  function apply(e) {
    e.preventDefault()
    const parts = input.split(',').map((s) => s.trim())
    const values = parts.map(Number)
    if (parts.includes('') || !values.every(Number.isFinite)) {
      setError('Enter numbers separated by commas, such as 4, 2, 8.')
      return
    }
    reset(values)
  }
  async function next() {
    if (busy || state.finished) return
    if (!compact) setBehind((previous) => [...previous.slice(-49), { state, message }])
    if (ahead.length) {
      const [frame, ...rest] = ahead
      setAhead(rest)
      setState(frame.state)
      setMessage(frame.message)
      setStep(step + 1)
      if (frame.state.finished) setPlaying(false)
      return
    }
    setBusy(true)
    try {
      let after
      if (api) {
        let id = session
        if (!id) {
          id = (await request('start', { algorithm: algorithm.id, array: state.array })).id
          setSession(id)
        }
        after = (await request(id + '/step')).state
      } else after = advance(algorithm.id, structuredClone(state))
      setMessage(describe(state, after, algorithm.id))
      setState(after)
      setStep(step + 1)
      if (after.finished) setPlaying(false)
    } catch (e) {
      if (!compact) setBehind((previous) => previous.slice(0, -1))
      setError(e.message)
      setPlaying(false)
    } finally {
      setBusy(false)
    }
  }
  function back() {
    const frame = behind.at(-1)
    if (!frame) return
    setAhead([{ state, message }, ...ahead])
    setBehind(behind.slice(0, -1))
    setState(frame.state)
    setMessage(frame.message)
    setStep(step - 1)
  }
  useEffect(() => {
    if (!playing || busy || state.finished) return
    const timer = setTimeout(next, 820)
    return () => clearTimeout(timer)
  })
  const max = state.array.reduce((m, v) => Math.max(m, Math.abs(v)), 1)
  const low = state.array.reduce((m, v) => Math.min(m, v / max), 0)
  const high = state.array.reduce((m, v) => Math.max(m, v / max), 0)
  const active = state.lastSwapped || state.lastMoved || state.lastCompared || []
  return (
    <section className="sim" aria-label={algorithm.title + ' simulator'}>
      <div className="sim-head">
        <b>
          <i className="light" /> {algorithm.title}
        </b>
        <span>Step {String(step).padStart(2, '0')}</span>
      </div>
      <div
        className="plot"
        role="img"
        tabIndex={state.array.length > 12 ? 0 : undefined}
        aria-label={'Current order: ' + state.array.join(', ')}
      >
        {state.array.map((v, i) => (
          <div
            aria-hidden="true"
            key={i}
            className={'bar ' + (active.includes(i) ? 'active' : '')}
            style={{ height: 20 + (74 * (v / max - low)) / (high - low || 1) + '%' }}
          >
            <span>{v}</span>
          </div>
        ))}
      </div>
      <p className="feedback" aria-live={playing ? 'off' : 'polite'}>
        {message}
      </p>
      <div className="sim-controls">
        {!compact && (
          <button disabled={!behind.length || busy || playing} onClick={back}>
            Back one step
          </button>
        )}
        <button className="primary" disabled={busy || state.finished || playing} onClick={next}>
          Step forward
        </button>
        {!compact && (
          <button disabled={state.finished} onClick={() => setPlaying(!playing)}>
            {playing ? 'Pause' : 'Auto-play'}
          </button>
        )}
        <button
          disabled={busy}
          onClick={() => {
            setInput(initial.join(', '))
            reset(initial)
          }}
        >
          Reset
        </button>
      </div>
      {!compact && (
        <form className="array-form" onSubmit={apply}>
          <label htmlFor="numbers">Try your own numbers</label>
          <div>
            <input id="numbers" value={input} onChange={(e) => setInput(e.target.value)} />
            <button disabled={busy}>Apply</button>
          </div>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  )
}
