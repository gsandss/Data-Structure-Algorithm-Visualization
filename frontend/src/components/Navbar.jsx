import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <header>
      <nav className="wrap">
        <Link to="/" className="brand">
          <b aria-hidden="true">▥</b> DSA Lab
        </Link>
        <Link to="/#topics">Topic library</Link>
      </nav>
    </header>
  )
}
