import { motion } from "framer-motion";

import { FcGoogle } from "react-icons/fc";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useContext,
  useEffect,
} from "react";

import axiosInstance from "../api/axios";

import { AuthContext }
from "../context/AuthContext";

import "../styles/Login.css";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  /* STATES */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* AUTO LOGIN */

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      navigate("/dashboard");
    }

  }, []);

  /* LOGIN HANDLER */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(
          "/api/auth/login",
          {
            email,
            password,
          }
        );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      /* USER DATA */

      const userData =
        response.data;

      /* INVALID LOGIN */

      if (!userData) {

        alert(
          "Invalid email or password"
        );

        return;
      }

      /* TOKEN */

      const token =
        userData.token;

      if (!token) {

        alert(
          "Token not found"
        );

        return;
      }

      console.log(
        "VALID TOKEN:",
        token
      );

      /* CLEAR OLD STORAGE */

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      /* STORE TOKEN */

      localStorage.setItem(
        "token",
        token
      );

      /* STORE FULL USER */

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      console.log(
        "STORED USER:",
        userData
      );

      /* AUTH CONTEXT */

      login(
        token,
        userData
      );

      /* REDIRECT */

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      {/* BACKGROUND GLOW */}

      <div className="login-glow-1"></div>

      <div className="login-glow-2"></div>

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6
        }}

        className="login-card"
      >

        {/* LEFT */}

        <div className="login-left">

          <h1 className="login-title">

            AI-Powered <br />
            Assessments

          </h1>

          <p className="login-subtitle">

            Evaluate skills,
            track performance,
            and build smarter
            hiring systems.

          </p>

          <div className="login-dots">

            <span className="dot purple"></span>

            <span className="dot blue"></span>

            <span className="dot pink"></span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-right">

          <h2 className="welcome-text">

            Welcome Back 👋

          </h2>

          <p className="welcome-subtext">

            Login to continue
            your journey

          </p>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email
              </label>

              <input

                type="email"

                placeholder="you@example.com"

                className="login-input"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input

                type="password"

                placeholder="••••••••"

                className="login-input"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                required
              />

            </div>

            {/* BUTTONS */}

            <div className="auth-buttons">

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {
                  loading
                    ? "Signing In..."
                    : "Sign In"
                }

              </button>

              <button

                type="button"

                className="register-btn"

                onClick={() =>
                  navigate("/register")
                }
              >

                Register

              </button>

            </div>

            {/* DIVIDER */}

            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>

            {/* GOOGLE */}

            <button
              type="button"
              className="google-btn"
            >

              <FcGoogle className="google-icon" />

              <span>

                Continue with Google

              </span>

            </button>

          </form>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;