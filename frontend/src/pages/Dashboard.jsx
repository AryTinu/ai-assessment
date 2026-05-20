import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";

import ProgressCard from "../components/ProgressCard";

import AssessmentCard from "../components/AssessmentCard";

import RecentAttemptCard from "../components/RecentAttemptCard";

import {
  getDashboardStats,
  getAssessments,
  getRecentAttempts,
} from "../services/dashboardService";

import {
  Trophy,
  Flame,
  Target,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import "../styles/Dashboard.css";

const Dashboard = () => {

  const user = JSON.parse(
  localStorage.getItem("user")
);

  const [stats, setStats] =
    useState({});

  const [assessments, setAssessments] =
    useState([]);

  const [attempts, setAttempts] =
    useState([]);

  const [greeting, setGreeting] =
    useState("");

  /* DYNAMIC GREETING */

  useEffect(() => {

    const hour =
      new Date().getHours();

    if (hour < 12) {

      setGreeting(
        "Good Morning ☀️"
      );

    } else if (hour < 18) {

      setGreeting(
        "Good Afternoon 🚀"
      );

    } else {

      setGreeting(
        "Good Evening 🌙"
      );
    }

    fetchDashboardData();

  }, []);

  /* FETCH DATA */

  const fetchDashboardData =
    async () => {

      try {

        const statsData =
          await getDashboardStats();

        const assessmentData =
          await getAssessments();

        const attemptData =
          await getRecentAttempts();

        setStats(statsData);

        setAssessments(assessmentData);

        setAttempts(attemptData);

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <DashboardLayout>

      {/* HERO SECTION */}

      <div className="dashboard-hero">

        <div className="dashboard-hero-content">

          <div className="hero-badge">

            <Sparkles size={16} />

            AI Assessment Platform

          </div>

          <h1>

            {greeting}

          </h1>

          <p>

            Continue mastering your skills,
            improve rankings, and dominate
            your assessments.

          </p>

          <div className="hero-actions">

            <button
              className="hero-primary-btn"
            >

              Start Learning

            </button>

            <button
              className="hero-secondary-btn"
            >

              View Analytics

            </button>

          </div>

        </div>

        {/* FLOATING CARD */}

        <div className="hero-floating-card">

          <div className="floating-top">

            <BrainCircuit size={34} />

            <span>
              AI Performance
            </span>

          </div>

          <h2>

            {stats.averageScore || 0}%

          </h2>

          <p>

            Average Score Growth

          </p>

          <div className="floating-progress">

            <div
              className="floating-progress-fill"
              style={{
                width:
                  `${stats.averageScore || 0}%`
              }}
            ></div>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <StatCard
          title="Assessments"
          value={stats.totalAssessments || 0}
          subtitle="Available tests"
          icon={<Target size={20} />}
        />

        <StatCard
          title="Attempts"
          value={stats.totalAttempts || 0}
          subtitle="Completed attempts"
          icon={<Flame size={20} />}
        />

        <StatCard
          title="Average Score"
          value={`${stats.averageScore || 0}%`}
          subtitle="Overall performance"
          icon={<BrainCircuit size={20} />}
        />

        <StatCard
          title="Rank"
          value={`#${stats.rank || 0}`}
          subtitle="Leaderboard position"
          icon={<Trophy size={20} />}
        />

      </div>

      {/* MAIN GRID */}

      <div className="dashboard-main-grid">

        {/* LEFT */}

        <div className="dashboard-left">

          <ProgressCard />

          {/* ASSESSMENTS */}

          <div className="dashboard-section">

            <div className="section-header">

              <div>

                <h2>

                  Trending Assessments

                </h2>

                <p>

                  Recommended for your
                  growth path

                </p>

              </div>

            </div>

            <div className="assessment-grid">

              {
                assessments.map(
                  (assessment) => (

                    <AssessmentCard

                      key={assessment.id}

                      id={assessment.id}

                      title={assessment.title}

                      difficulty={
                        assessment.difficulty
                      }
                    />
                  )
                )
              }

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="dashboard-right">

          {/* PROFILE CARD */}

          <div className="profile-mini-card">

            <div className="profile-avatar">

              A

            </div>

            <h3>
  {user?.name || "User"}
</h3>

          <p>
  {user?.email}
</p>

            <div className="profile-stats">

              <div>

                <strong>
                  {stats.totalAttempts || 0}
                </strong>

                <span>
                  Attempts
                </span>

              </div>

              <div>

                <strong>
                  #{stats.rank || 0}
                </strong>

                <span>
                  Rank
                </span>

              </div>

            </div>

          </div>

          {/* RECENT */}

          <div className="dashboard-section">

            <div className="section-header">

              <div>

                <h2>

                  Recent Attempts

                </h2>

                <p>

                  Your latest performance

                </p>

              </div>

            </div>

            <div className="recent-list">

              {
                attempts.map(
                  (attempt) => (

                    <RecentAttemptCard

                      key={attempt.id}

                      title={attempt.title}

                      score={attempt.score}
                    />
                  )
                )
              }

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;