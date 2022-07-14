import '../styles/App.css';
import { Link } from 'react-router-dom';

const LandingPage = ({name}) => {
  return (
    <div className="standard-body">
      <div className="main-content">
        <h1>Home Page</h1>
        <Link to={'signup'}><button>Sign Up Page</button></Link>
      </div>
    </div>
  )
}

export default LandingPage