import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Trophy,
  Medal,
  Crown,
  Flame,
} from "lucide-react";

import axiosInstance from "../api/axios";

import "../styles/Leaderboard.css";

const Leaderboard = () => {

  const [leaders, setLeaders] =
    useState([]);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard = async () => {

    try {

      const response =
        await axiosInstance.get(
          "/api/assessment/leaderboard"
        );

      setLeaders(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <DashboardLayout>

      <div className="leaderboard-page">

        {/* HEADER */}

        <div className="leaderboard-header">

          <div>

            <h1>
              Global Leaderboard 🏆
            </h1>

            <p>
              Top performing candidates
              across all assessments
            </p>

          </div>

          <div className="leaderboard-badge">

            <Crown size={18} />

            Top Rankings

          </div>

        </div>

        {/* TOP 3 */}

        <div className="top-three-grid">

          {
            leaders.slice(0, 3).map(
              (user, index) => (

                <div
                  key={index}
                  className={`top-card top-${index + 1}`}
                >

                  <div className="top-rank-icon">

                    {
                      index === 0
                        ? <Crown size={28} />
                        : <Medal size={26} />
                    }

                  </div>

                  <div className="top-avatar">

                    {
                      user.candidate?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "A"
                    }

                  </div>

                  <h2>

                    {
                      user.candidate?.name
                      || "Candidate"
                    }

                  </h2>

                  <p>

                    Assessment Champion

                  </p>

                  <div className="top-score">

                    {user.score || 0}%

                  </div>

                </div>
              )
            )
          }

        </div>

        {/* FULL TABLE */}

        <div className="leaderboard-table-card">

          <div className="table-header">

            <h2>

              Rankings

            </h2>

            <div className="table-live">

              <Flame size={16} />

              Live Rankings

            </div>

          </div>

          <div className="leaderboard-table">

            {
              leaders.map(
                (user, index) => (

                  <div
                    className="leaderboard-row"
                    key={index}
                  >

                    {/* LEFT */}

                    <div className="leaderboard-user">

                      <div className="rank-number">

                        #{index + 1}

                      </div>

                      <div className="user-avatar">

                        {
                          user.candidate?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "A"
                        }

                      </div>

                      <div>

                        <h3>

                          {
                            user.candidate?.name
                            || "Candidate"
                          }

                        </h3>

                        <p>

                          Skill Assessment

                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="leaderboard-score">

                      {user.score || 0}%

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

export default Leaderboard;