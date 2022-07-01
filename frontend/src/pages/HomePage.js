import '../App.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>New Home Page</h1>
        <Link to={'signup'}><button>Sign Up Page</button></Link>
      </header>
    </div>
  )
}

export default HomePage