import { useState } from 'react'

const seed = [2, 5, 4, 9, 8, 7, 6]
const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
]
const network = [...edges, [4, 5]]
const positions = [
  [150, 26],
  [79, 87],
  [221, 87],
  [33, 151],
  [117, 151],
  [183, 151],
  [267, 151],
]

function Diagram({ values, links, active }) {
  return (
    <svg
      className="network"
      viewBox="0 0 300 180"
      role="img"
      aria-label={
        'Node values: ' + values.join(', ') + '. Highlighted: ' + (values[active] ?? 'none')
      }
    >
      {links
        .filter(([a, b]) => a < values.length && b < values.length)
        .map(([a, b]) => (
          <line
            key={a + '-' + b}
            x1={positions[a][0]}
            y1={positions[a][1]}
            x2={positions[b][0]}
            y2={positions[b][1]}
          />
        ))}
      {values.map((v, i) => (
        <g key={i} className={i === active ? 'selected' : ''}>
          <circle cx={positions[i][0]} cy={positions[i][1]} r="19" />
          <text x={positions[i][0]} y={positions[i][1] + 5}>
            {v}
          </text>
        </g>
      ))}
    </svg>
  )
}

function NetworkLab({ id }) {
  const graph = id === 'graph',
    heap = id === 'heap'
  const [values, setValues] = useState(heap ? seed : ['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  const [visited, setVisited] = useState([])
  const [pending, setPending] = useState([0])
  const [msg, setMsg] = useState(
    heap
      ? 'Which value will be removed first?'
      : graph
        ? 'Start at A. Explore each level before moving deeper.'
        : 'Start at the root. Visit each node before exploring its children, left first.',
  )
  function visit() {
    const [node, ...rest] = pending
    const next = graph
      ? network.flatMap(([a, b]) => (a === node ? [b] : b === node ? [a] : []))
      : edges.filter(([a]) => a === node).map(([, b]) => b)
    const fresh = next.filter((i) => i !== node && !visited.includes(i) && !rest.includes(i))
    const todo = graph ? [...rest, ...fresh] : [...fresh, ...rest]
    setPending(todo)
    setVisited([...visited, node])
    setMsg(
      'Visit ' +
        values[node] +
        '. ' +
        (todo.length
          ? 'Next to visit: ' + todo.map((i) => values[i]).join(', ') + '.'
          : 'Traversal complete.'),
    )
  }
  function extract() {
    const arr = [...values],
      minimum = arr[0],
      last = arr.pop()
    if (arr.length) arr[0] = last
    let i = 0
    while (2 * i + 1 < arr.length) {
      let child = 2 * i + 1
      if (child + 1 < arr.length && arr[child + 1] < arr[child]) child++
      if (arr[i] <= arr[child]) break
      ;[arr[i], arr[child]] = [arr[child], arr[i]]
      i = child
    }
    setValues(arr)
    setMsg(
      'Removed ' +
        minimum +
        '. ' +
        (arr.length
          ? 'After restoring heap order, the minimum is ' + arr[0] + '.'
          : 'The heap is empty.'),
    )
  }
  return (
    <>
      <Diagram values={values} links={graph ? network : edges} active={heap ? 0 : visited.at(-1)} />
      {!heap && <p>Visited: {visited.map((i) => values[i]).join(' · ') || 'none yet'}</p>}
      <p className="response" aria-live="polite">
        {msg}
      </p>
      <button
        className="primary"
        onClick={heap ? extract : visit}
        disabled={heap ? !values.length : !pending.length}
      >
        {heap ? 'Extract minimum' : 'Visit next node'}
      </button>
    </>
  )
}

function HashLab({ id }) {
  const table = id === 'hash-table'
  const [entries, setEntries] = useState([
    [2, 'blue'],
    [5, 'mint'],
  ])
  const [key, setKey] = useState('6'),
    [value, setValue] = useState('plum')
  const [msg, setMsg] = useState(
    'Try key 6. It shares a bucket with key 2 because both leave remainder 2 when divided by 4.',
  )
  const bucket = (k) => ((k % 4) + 4) % 4
  function act(insert) {
    const k = Number(key)
    if (!key.trim() || !Number.isSafeInteger(k) || (insert && table && !value.trim())) {
      setMsg('Enter an integer key' + (table ? ' and a value' : '') + '.')
      return
    }
    const found = entries.find(([n]) => n === k)
    if (insert && (!found || table)) setEntries([...entries.filter(([n]) => n !== k), [k, value]])
    const result = insert
      ? found
        ? table
          ? 'Updated the value.'
          : 'Already present. The set stays the same.'
        : 'Added the key.'
      : found
        ? 'Found ' + (table ? found[1] : k) + '.'
        : 'Key not present.'
    setMsg('Bucket ' + bucket(k) + ': ' + result)
  }
  return (
    <>
      <div className="buckets">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <b>Bucket {i}</b>
            <span>
              {entries
                .filter(([k]) => bucket(k) === i)
                .map(([k, v]) => (table ? k + ' → ' + v : k))
                .join('  ·  ') || 'Empty'}
            </span>
          </div>
        ))}
      </div>
      <div className="fields">
        <label>
          Integer key
          <input type="number" value={key} onChange={(e) => setKey(e.target.value)} />
        </label>
        {table && (
          <label>
            Value
            <input value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        )}
      </div>
      <p className="response" aria-live="polite">
        {msg}
      </p>
      <button className="primary" onClick={() => act(true)}>
        {table ? 'Set key' : 'Add key'}
      </button>{' '}
      <button onClick={() => act(false)}>Look up</button>
    </>
  )
}

function LinearLab({ id }) {
  const [values, setValues] = useState([4, 7, 2]),
    [n, setN] = useState('9'),
    [index, setIndex] = useState(0)
  const [msg, setMsg] = useState(
    id === 'array'
      ? 'Select an index to read its value.'
      : id === 'linked-list'
        ? 'Start at the head and follow the next link.'
        : 'Predict which item will leave first.',
  )
  const isStack = id === 'stack',
    isList = id === 'linked-list',
    isArray = id === 'array'
  function add() {
    if (!n.trim() || !Number.isFinite(Number(n))) return setMsg('Enter a number to add.')
    setValues([...values, Number(n)])
    setMsg('Added ' + Number(n) + (isStack ? ' to the top.' : ' at the back.'))
  }
  function remove() {
    let i = isStack ? values.length - 1 : 0
    setMsg('Removed ' + values[i] + (isStack ? ' from the top.' : ' from the front.'))
    setValues(values.filter((_, j) => i !== j))
  }
  return (
    <>
      <div className={'cells ' + (isStack ? 'stack' : isList ? 'chain' : '')}>
        {values.map((v, i) => {
          const marker = isArray
            ? '[' + i + ']'
            : isList
              ? i === 0
                ? 'Head'
                : i === values.length - 1
                  ? 'Tail'
                  : 'Node'
              : isStack
                ? i === values.length - 1
                  ? 'Top'
                  : ''
                : i === 0
                  ? 'Front'
                  : i === values.length - 1
                    ? 'Back'
                    : ''
          return (
            <div key={i} className="cell">
              {isArray ? (
                <button
                  aria-label={'Read index ' + i + ', value ' + v}
                  aria-pressed={index === i}
                  onClick={() => {
                    setIndex(i)
                    setMsg('Index ' + i + ' contains ' + v + '.')
                  }}
                  className={index === i ? 'marked' : ''}
                >
                  {v}
                </button>
              ) : (
                <b
                  className={
                    (isList ? index === i : isStack ? i === values.length - 1 : i === 0)
                      ? 'marked'
                      : ''
                  }
                >
                  {v}
                </b>
              )}
              <small>{marker}</small>
            </div>
          )
        })}
        {!values.length && <span>Empty</span>}
      </div>
      {!isList && !isArray && (
        <label>
          Value to add
          <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
        </label>
      )}
      <p className="response" aria-live="polite">
        {msg}
      </p>
      {isList ? (
        <button
          className="primary"
          disabled={index === values.length - 1}
          onClick={() => {
            setIndex(index + 1)
            setMsg(
              'Follow the link to ' +
                values[index + 1] +
                (index + 2 === values.length ? '. The tail points to null.' : '.'),
            )
          }}
        >
          Follow next link
        </button>
      ) : (
        !isArray && (
          <>
            <button className="primary" onClick={add}>
              {isStack ? 'Push' : 'Enqueue'}
            </button>{' '}
            <button disabled={!values.length} onClick={remove}>
              {isStack ? 'Pop' : 'Dequeue'}
            </button>
          </>
        )
      )}
    </>
  )
}

export default function StructureLab({ topic }) {
  const [run, setRun] = useState(0)
  const Lab = topic.group === 1 ? LinearLab : topic.slug.startsWith('hash') ? HashLab : NetworkLab
  return (
    <section className="lab">
      <div className="lab-head">
        <h2>Try it yourself</h2>
        <button onClick={() => setRun(run + 1)}>Reset</button>
      </div>
      <Lab key={run} id={topic.slug} />
    </section>
  )
}
