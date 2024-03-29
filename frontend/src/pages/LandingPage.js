import '../styles/App.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../ContextObjs';
import splash from '../assets/splash.png';

const LandingPage = ({name}) => {
  const { state } = useContext(StateContext);
  return (
    <div className="standard-body">
      <div className="main-content">
      <img src={splash} />
        { !state.user ?
          <div className='landing-buttons'>
            <Link to={'signup'}>
              <button className="landing-button">Sign Up Page</button>
            </Link>
            <Link to={'login'}>
              <button className="landing-button">Login Page</button>
            </Link>
          </div> :
          <div className='landing-buttons'>
            <h2>Welcome {state.user.first_name}<br/>You're already logged in</h2>
            <Link to={'dashboard'}>
              <button className="landing-button">My Dashboard</button>
            </Link>
        </div>
        }
      </div>
    </div>
  )
}

export default LandingPage