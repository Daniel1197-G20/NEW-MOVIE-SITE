import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { account } from "../appwriteC````````onfig";
import "./Login.css";

function LoginForm() {
  const [isActive, setIsActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [signInData, setSignInData] = useState({ email: "", password: "" });
 ({
    signUp: { name: "", email: "", password: "" },
    signIn: { email: "", password: "" },
  });
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });


  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpData;

    if (!validateEmail(email) || !validatePassword(password)) {
      Toast.fire({ icon: "error", title: "Invalid email or password" });
      return;
    }

    try {
      await account.create("unique()", email, password, name);
      Toast.fire({ icon: "success", title: "Account created successfully!" });
      setIsActive(false);
    } catch (err) {
      console.error(err);
      Toast.fire({ icon: "error", title: err.message });
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const { email, password } = signInData;

    try {
      await account.createEmailPasswordSession(email, password);
      Toast.fire({ icon: "success", title: "Logged in successfully!" });
      navigate("/");
    } catch (err) {
      console.error(err);
      Toast.fire({ icon: "error", title: err.message });
    }
  };

  const handleRegister = () => setIsActive(true);
  const handleLogin = () => setIsActive(false);

  return (
    <div className={`LoginForm-container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1 className="creatAccount-t">Create Account</h1>

          <input
            name="name"
            type="text"
            placeholder="Name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>


      <div className="form-container sign-in">
        <form onSubmit={handleUserLogin}>
          <h1 className="login-t">Sign In</h1>
          <span>use your email password</span>

          <input
            type="email"
            placeholder="Email"
            value={signInData.email}
            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password</Link>
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>


      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site’s features</p>
            <button className="hidden" onClick={handleLogin}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Access your account to explore all the platform’s tools and resources.</p>
            <button className="hidden" onClick={handleRegister}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
