import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axiosInstance from "../api/axios";

import "../styles/Register.css";

const Register = () => {

  const navigate = useNavigate();

  /* STATES */

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  /* REGISTER HANDLER */

  const handleRegister = async (e) => {

    e.preventDefault();

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");

      return;
    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      const response = await axiosInstance.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);

      alert("Registration Successful 🚀");

      /* REDIRECT */

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* BACKGROUND GLOW */}
      <div className="register-glow-1"></div>

      <div className="register-glow-2"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="register-card"
      >

        {/* LEFT */}
        <div className="register-left">

          <h1 className="register-title">
            Join The <br />
            Future Of Assessments
          </h1>

          <p className="register-subtitle">
            Create your account and start building
            smarter evaluation systems.
          </p>

          <div className="register-dots">

            <span className="dot purple"></span>

            <span className="dot blue"></span>

            <span className="dot pink"></span>

          </div>

        </div>

        {/* RIGHT */}
        <div className="register-right">

          <h2 className="welcome-text">
            Create Account 🚀
          </h2>

          <p className="welcome-subtext">
            Register to get started
          </p>

          <form
            className="register-form"
            onSubmit={handleRegister}
          >

            {/* FULL NAME */}
            <div className="input-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Aryan Shende"
                className="register-input"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            {/* EMAIL */}
            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="you@example.com"
                className="register-input"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="••••••••"
                className="register-input"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="••••••••"
                className="register-input"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-main-btn"
            >
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>

            {/* DIVIDER */}
            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              className="google-btn"
            >
              <FcGoogle className="google-icon" />

              <span>
                Continue with Google
              </span>
            </button>

            {/* BACK LOGIN */}
            <button
              type="button"
              className="back-login-btn"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;