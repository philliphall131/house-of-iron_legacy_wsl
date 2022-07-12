import './App.css';
import { useEffect, useReducer } from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthContext, StateContext } from './ContextObjs';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Protected from './components/Protected';
import SignedIn from './components/SignedIn';
import ironAPI from './utils/ironAPI';
import LoadingScreen from './components/LoadingScreen';

function App() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.data.token,
            user: action.data.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          // store the token
          localStorage.setItem("userToken", action.data.token);
          localStorage.setItem("userId", action.data.user.id);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.data.token,
            user: action.data.user
          };
        case 'SIGN_OUT':
          // reset token to null
          localStorage.setItem("userToken", null);
          localStorage.setItem("userId", null);
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
      testUser: null
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userId;
      let data = { user: null, token: null };
      try {
        // Restore token
        userId = sessionStorage.getItem('userId')
        userToken = sessionStorage.getItem("userToken");
      } catch (e) {
        console.log('Error retrieving token')
      }
      // If a token was retrieved, validate Token, get user info
      if (userId && userToken){
        let userResponse = await ironAPI.getUser(userId, userToken)
        if (userResponse && userResponse.data){
          data = { user: userResponse.data, token: userToken }
        } else {
          console.log('Could not retrieve user with credentials stored, try logging in')
        }
      };
      dispatch({ type: 'RESTORE_TOKEN', data });
    };
    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (data) => {
      // get a token (and handle errors)
      let response = await ironAPI.login(data)
      if (response){
        if (response.error) {
          alert(`${response.error}: Invalid login credentials`)
          return
        } else if (response.data && response.data.token && response.data.user) {
          // add the token to state
          dispatch({ type: 'SIGN_IN', data: response.data });
          return
        } else {
          alert('Error with login response, contact site admin')
          return
        }
      }
      alert('Error with login request, contact site admin')
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  };

  const stateContext = {
    'state': state,
    'dispatch': dispatch
  }

  return (
    <div>
      <AuthContext.Provider value={authContext}>
        <StateContext.Provider value={stateContext}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage name={state.testUser}/>}/>
            <Route path="/signup" element={<SignedIn page={<SignupPage />}/>}/>
            <Route path="/login" element={<SignedIn page={<LoginPage />}/>}/>
            <Route path="/protected" element={<Protected page={<HomePage />}/>}/>
          </Routes>
        </StateContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
