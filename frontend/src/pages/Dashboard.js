import { useContext } from 'react';
import '../styles/App.css';
import { StateContext } from '../ContextObjs';

const Dashboard = ({name}) => {
  const { state } = useContext(StateContext);
  return (
    <div className="standard-body">
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>{state.user.id}</p>
      </div>
    </div>
  )
}

export default Dashboard