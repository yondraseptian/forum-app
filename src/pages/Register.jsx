import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Input type="text" className="border-solid border-2 p-2">Username</Input>
      <Input type="email" className="border-solid border-2 p-2">Email</Input>
      <Input type="password" className="border-solid border-2 p-2">Password</Input>
      <Button className="bg-primary text-white my-3 w-full py-3 rounded-md">
        Register
      </Button>
      <p>
        Sudah punya akun?{" "}
        <Link to="/login">
          <span className="font-bold">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
