import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import DetailThread from "./pages/DetailThread";
import AddThread from "./pages/AddThread";
import LeaderBoardPage from "./pages/LeaderBoardPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <header>
        <HeaderNav handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
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
