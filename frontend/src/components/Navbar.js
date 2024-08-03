import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>You Can Do It</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <button>
                {location.pathname !== '/login' && (
                  <Link to="/login" style={{ color: 'blue' }}>Masuk</Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link to="/signup" style={{ color: 'blue' }}>Daftar</Link>
                )}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar