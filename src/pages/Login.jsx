/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { loginUserAsync } from '../redux/slices/authUser/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUserAsync({ email, password }));
      if (!error) {
        navigate('/');
      } else if (error !== 'Unauthorized') {
        alert(`Failed to log in: ${error}`);
      }
    } catch (error) {
      alert(`Failed to log in: ${error.message}`);
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Login</h1>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-solid border-2 p-2"
        placeholder="Email"
      >
        Email
      </Input>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-solid border-2 p-2"
        placeholder="Password"
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
        Belum punya akun?
        {' '}
        <Link to="/register">
          <span className="font-bold">Register</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
