import "./SignUp.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "../components/Input.jsx";
import { PasswordCritieria } from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";
function SignUp() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Passowrd, setPassword] = useState("");
  const [hidePass, sethidePass] = useState(false);
  const navigate = useNavigate();
  const { signup, user, isAuthenticated, error, isLoading, isCheckingAuth } =
    useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({ email: Email, password: Passowrd, name: Name });
      navigate("/verify");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create SignUp</h1>
        <form onSubmit={handleSubmit}>
          <Input
            setFunction={setName}
            type="text"
            placeholder="Enter Your Full Name"
            value={Name}
          />
          <Input
            setFunction={setEmail}
            type="email"
            placeholder="Enter You Email"
            value={Email}
          />
          <div className="password-wrapper">
            <Input
              setFunction={setPassword}
              type={hidePass ? "text" : "password"}
              placeholder="Enter Your Password"
              value={Passowrd}
            />

            <input
              type="checkbox"
              className="show-password-checkbox"
              checked={hidePass}
              onChange={() => sethidePass(!hidePass)}
            />
          </div>
          <button type="submit">{isLoading ? "Submiting..." : "Submit"}</button>
        </form>
        <div className="login-button-container">
          <p>Already Have Account? </p>
          <Link to="/login">Go to Login </Link>
        </div>
        <PasswordCritieria password={Passowrd} />
      </div>
    </div>
  );
}

export default SignUp;
