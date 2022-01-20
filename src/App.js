import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

//pages and components
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
