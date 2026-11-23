import { Link } from 'react-router-dom'
export function TopicMark({ group }) {
  return (
    <span className={'mark mark-' + group} aria-hidden="true">
      {group === 0 ? '▥' : group === 1 ? '▦' : '⑂'}
    </span>
  )
}
export default function Card({ topic }) {
  return (
    <Link className={'topic group-' + topic.group} to={'/' + topic.slug}>
      <TopicMark group={topic.group} />
      <h3>{topic.title}</h3>
      <p>{topic.summary}</p>
    </Link>
  )
}
