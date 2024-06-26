/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import HeaderNav from './components/HeaderNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { logout } from './redux/slices/authUser/authSlice';
import DetailThread from './pages/DetailThread';
import AddThread from './pages/AddThread';
import LeaderBoardPage from './pages/LeaderBoardPage';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div>
      <header>
        <HeaderNav handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <div className="z-10 mt-16 w-full fixed">
          <LoadingBar className="h-2 bg-red-500 w-full" />
        </div>
      </header>
      <main className="bg-white mx-auto my-0 block max-w-4xl min-h-screen pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/threads/:id" element={<DetailThread />} />
          <Route path="*" element={<Home />} />
          <Route path="/new" element={<AddThread />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
