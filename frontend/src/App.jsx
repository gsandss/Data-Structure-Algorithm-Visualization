import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom'
import Card from './Card'
import SortingVisualizer from './components/SortingVisualizer'
import StructurePage from './pages/StructurePage'
import AlgorithmPage from './pages/AlgorithmPage'
import { topics, categories } from './data/topics'

function Home() {
  const [group, setGroup] = useState('All topics')
  const visible = topics.filter((t) => group === 'All topics' || categories[t.group] === group)
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Learn DSA
              <br />
              <em>by doing.</em>
            </h1>
            <p>
              See how data moves. Make a prediction, take a step, and discover how algorithms and
              data structures work.
            </p>
            <a className="primary btn" href="#topics">
              Explore topics
            </a>
          </div>
          <div className="demo-frame">
            <SortingVisualizer algorithm={topics[0]} compact />
          </div>
        </div>
      </section>
      <section id="topics" className="wrap library">
        <div className="section-title">
          <h2>Topic library</h2>
          <span>{visible.length} topics</span>
        </div>
        <div className="filters" role="group" aria-label="Filter topics">
          {['All topics', ...categories].map((g) => (
            <button key={g} aria-pressed={g === group} onClick={() => setGroup(g)}>
              {g}
            </button>
          ))}
        </div>
        <div className="cards">
          {visible.map((t) => (
            <Card topic={t} key={t.slug} />
          ))}
        </div>
      </section>
    </>
  )
}
function Lesson() {
  const { slug } = useParams()
  const topic = topics.find((t) => t.slug === slug)
  if (!topic)
    return (
      <div className="wrap lesson">
        <h1>Topic not found</h1>
        <Link to="/#topics">Browse topics</Link>
      </div>
    )
  return (
    <article className="wrap lesson">
      <Link className="back" to="/#topics">
        Topic library
      </Link>
      <div className="lesson-head">
        <p className="category">{categories[topic.group]}</p>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
      </div>
      {topic.group === 0 ? <AlgorithmPage topic={topic} /> : <StructurePage topic={topic} />}
      <p className="next-topic">
        Explore next{' '}
        <Link to={'/' + topics[(topics.indexOf(topic) + 1) % topics.length].slug}>
          {topics[(topics.indexOf(topic) + 1) % topics.length].title}
        </Link>
      </p>
    </article>
  )
}
export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title =
      (topics.find((t) => '/' + t.slug === pathname)?.title || 'Interactive topic library') +
      ' | DSA Lab'
    if (hash === '#topics') document.getElementById('topics')?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <main id="main">
      <Routes>
        <Route index element={<Home />} />
        <Route path=":slug" element={<Lesson />} />
        <Route path="*" element={<Lesson />} />
      </Routes>
    </main>
  )
}
