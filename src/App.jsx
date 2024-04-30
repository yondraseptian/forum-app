import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/loginSlice";
import DetailThread from "./components/DetailThread";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
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
          <Route path="/threads/:id" element={<DetailThread isLoggedIn={isLoggedIn}/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
