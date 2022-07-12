import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <div className="my-nav-container">
      <div className="my-nav-brand">
        <Link className="my-nav-link brand-text" to="/">House of Iron</Link>
      </div>
      <div className="my-nav">
        <div className="my-nav-item">
          <Link className="my-nav-link" to="/signup">Sign Up</Link>
        </div>
        <div className="my-nav-item right-item">
          <Link className="my-nav-link" to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar