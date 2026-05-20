import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Activity,
  TrendingUp,
  BrainCircuit,
  Trophy,
  BarChart3,
  Target,
} from "lucide-react";

import axiosInstance from "../api/axios";

import "../styles/Analytics.css";

const Analytics = () => {

  const [stats, setStats] =
    useState({});

  const [attempts, setAttempts] =
    useState([]);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const statsResponse =
        await axiosInstance.get(
          "/api/dashboard/stats"
        );

      const attemptsResponse =
        await axiosInstance.get(
          "/api/assessment/recent"
        );

      setStats(
        statsResponse.data
      );

      setAttempts(
        attemptsResponse.data
      );

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <DashboardLayout>

      <div className="analytics-page">

        {/* HEADER */}

        <div className="analytics-header">

          <div>

            <h1>

              Analytics Dashboard 📊

            </h1>

            <p>

              Track your performance,
              growth and assessment
              insights in real time

            </p>

          </div>

          <div className="analytics-badge">

            <Activity size={18} />

            Live Insights

          </div>

        </div>

        {/* TOP STATS */}

        <div className="analytics-stats-grid">

          <div className="analytics-stat-card">

            <div className="analytics-icon">

              <Target size={22} />

            </div>

            <h4>
              Assessments
            </h4>

            <h1>
              {stats.totalAssessments || 0}
            </h1>

            <p>
              Total active tests
            </p>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-icon">

              <BrainCircuit size={22} />

            </div>

            <h4>
              Average Score
            </h4>

            <h1>
              {stats.averageScore || 0}%
            </h1>

            <p>
              Overall AI evaluation
            </p>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-icon">

              <TrendingUp size={22} />

            </div>

            <h4>
              Growth Rate
            </h4>

            <h1>
              +18%
            </h1>

            <p>
              Improvement this month
            </p>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-icon">

              <Trophy size={22} />

            </div>

            <h4>
              Leaderboard Rank
            </h4>

            <h1>
              #{stats.rank || 0}
            </h1>

            <p>
              Global platform rank
            </p>

          </div>

        </div>

        {/* CHART + INSIGHTS */}

        <div className="analytics-main-grid">

          {/* CHART */}

          <div className="analytics-chart-card">

            <div className="analytics-card-header">

              <div>

                <h2>

                  Performance Trend

                </h2>

                <p>

                  Last 6 assessments

                </p>

              </div>

              <BarChart3 size={22} />

            </div>

            <div className="analytics-chart">

              <div className="chart-bar chart1">

                <span>62%</span>

              </div>

              <div className="chart-bar chart2">

                <span>74%</span>

              </div>

              <div className="chart-bar chart3">

                <span>58%</span>

              </div>

              <div className="chart-bar chart4">

                <span>89%</span>

              </div>

              <div className="chart-bar chart5">

                <span>79%</span>

              </div>

              <div className="chart-bar chart6">

                <span>96%</span>

              </div>

            </div>

          </div>

          {/* AI INSIGHTS */}

          <div className="analytics-insight-card">

            <h2>

              AI Insights 🤖

            </h2>

            <div className="insight-item">

              <div className="insight-dot purple"></div>

              <div>

                <h4>
                  Strong Backend Skills
                </h4>

                <p>
                  Excellent performance
                  in Java & Spring Boot
                </p>

              </div>

            </div>

            <div className="insight-item">

              <div className="insight-dot blue"></div>

              <div>

                <h4>
                  Improve DSA
                </h4>

                <p>
                  Focus more on trees
                  and graph problems
                </p>

              </div>

            </div>

            <div className="insight-item">

              <div className="insight-dot green"></div>

              <div>

                <h4>
                  Consistency Boost
                </h4>

                <p>
                  Your scores improved
                  18% this month
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RECENT PERFORMANCE */}

        <div className="analytics-table-card">

          <div className="analytics-card-header">

            <div>

              <h2>

                Recent Performance

              </h2>

              <p>

                Latest assessment attempts

              </p>

            </div>

          </div>

          <div className="analytics-table">

            {
              attempts.map(
                (attempt, index) => (

                  <div
                    className="analytics-row"
                    key={index}
                  >

                    <div>

                      <h3>

                        {attempt.title}

                      </h3>

                      <p>

                        AI Assessment

                      </p>

                    </div>

                    <div className="analytics-score">

                      {attempt.score}%

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Analytics;