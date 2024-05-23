/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { registerUserAsync } from '../redux/slices/authUser/authSlice';

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await dispatch(registerUserAsync({ name, email, password }));
      if (!error) {
        navigate('/login');
      } else if (error !== 'Unauthorized') {
        alert(`Failed to register: ${error}`);
      }
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Register</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-solid border-2 p-2"
        placeholder=""
      >
        Name
      </Input>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-solid border-2 p-2"
        placeholder=""
      >
        Email
      </Input>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-solid border-2 p-2"
        placeholder=""
      >
        Password
      </Input>
      <Button
        className="bg-primary text-white my-3 w-full py-3 rounded-md"
        onClick={handleRegister}
        disabled={loading}
      >
        Register
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        Sudah punya akun?
        {' '}
        <Link to="/login">
          <span className="font-bold">Login</span>
        </Link>
      </p>
    </div>
  );
}

export default Register;
