import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUserAsync } from "../redux/slices/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    dispatch(loginUserAsync({ email, password }));
    if (!error) {
      navigate("/");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-solid border-2 p-2"
      >
        Email
      </Input>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-solid border-2 p-2"
      >
        Password
      </Input>
      <Button
        className="bg-primary text-white my-3 w-full py-3 rounded-md"
        onClick={handleLogin}
        disabled={loading}
      >
        Login
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        Belum punya akun?{" "}
        <Link to="/register">
          <span className="font-bold">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
