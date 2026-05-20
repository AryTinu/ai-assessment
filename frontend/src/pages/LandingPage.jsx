import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  Trophy,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "../styles/LandingPage.css";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* BACKGROUND GLOWS */}
      <div className="landing-glow-1"></div>
      <div className="landing-glow-2"></div>

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          AI Assess
        </div>

        <div className="nav-buttons">

          <button
            className="nav-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-register"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-content"
        >

          <p className="hero-badge">
            NEXT GENERATION AI ASSESSMENT PLATFORM
          </p>

          <h1 className="hero-title">
            Smarter Assessments <br />
            Better Hiring Decisions
          </h1>

          <p className="hero-subtitle">
            Create AI-powered assessments,
            evaluate candidates intelligently,
            and monitor performance using
            real-time analytics dashboards.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Start Free

              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="feature-card">

          <Brain size={44} />

          <h3>AI Evaluation</h3>

          <p>
            Smart candidate analysis powered
            by AI and machine learning.
          </p>
        </div>

        <div className="feature-card">

          <Trophy size={44} />

          <h3>Leaderboards</h3>

          <p>
            Rank users and monitor
            assessment performance.
          </p>
        </div>

        <div className="feature-card">

          <BarChart3 size={44} />

          <h3>Analytics</h3>

          <p>
            Visual dashboards with
            powerful performance insights.
          </p>
        </div>

        <div className="feature-card">

          <ShieldCheck size={44} />

          <h3>Secure Platform</h3>

          <p>
            JWT authentication and
            scalable backend security.
          </p>
        </div>

      </section>

    </div>
  );
};

export default LandingPage;