import { useState } from "react";
import { Link } from "react-router";
import { Input } from "../components/Input";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Sign in to your account
        </p>

        <form className="mt-8 space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            setFunction={setemail}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            setFunction={setpassword}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Forgot password?
            </Link>
          </div>

          <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700">
            Login
          </button>
        </form>

        <div className="mt-6 border-t pt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
