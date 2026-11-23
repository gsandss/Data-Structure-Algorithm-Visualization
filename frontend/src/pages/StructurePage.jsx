import StructureLab from '../components/StructureLab'
import { practice } from '../data/topics'
export default function StructurePage({ topic }) {
  return (
    <div className="lesson-grid">
      <StructureLab key={topic.slug} topic={topic} />
      <aside className="notes">
        <h2>Where it shows up</h2>
        <p>{practice[topic.slug][0]}</p>
        <h2>Make a prediction</h2>
        <p>{practice[topic.slug][1]}</p>
      </aside>
    </div>
  )
}
