import SortingVisualizer from '../components/SortingVisualizer'
export default function AlgorithmPage({ topic }) {
  return (
    <div className="lesson-grid">
      <SortingVisualizer key={topic.slug} algorithm={topic} />
      <aside className="notes">
        <h2>How it works</h2>
        <ol>
          {topic.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p>
          Worst-case time <strong>{topic.time}</strong>
        </p>
        <p>
          Auxiliary space{' '}
          <strong>
            {topic.id === 'merge' ? 'O(n)' : topic.id === 'quick' ? 'O(n) upper bound' : 'O(1)'}
          </strong>
        </p>
      </aside>
    </div>
  )
}
