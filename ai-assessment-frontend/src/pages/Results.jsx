import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Trophy,
  Target,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";

import axiosInstance from "../api/axios";

import "../styles/Results.css";

const Results = () => {

  const [results, setResults] =
    useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

 const fetchResults = async () => {

  try {

    /* REAL USER */

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || !user.id) {

      console.error(
        "User not found"
      );

      return;
    }

    console.log(
      "FETCHING RESULTS FOR:",
      user
    );

    const response =
      await axiosInstance.get(

        `/api/assessment/result/${user.id}`

      );

    console.log(
      "RESULTS:",
      response.data
    );

    setResults(response.data);

  } catch (error) {

    console.error(error);
  }
};

  return (

    <DashboardLayout>

      <div className="results-page">

        {/* HEADER */}

        <div className="results-header">

          <div>

            <h1>

              Assessment Results 📊

            </h1>

            <p>

              Track your completed
              assessments and performance

            </p>

          </div>

        </div>

        {/* OVERVIEW */}

        <div className="results-overview-grid">

          <div className="overview-card">

            <div className="overview-icon purple">

              <Target size={24} />

            </div>

            <h2>

              {results.length}

            </h2>

            <p>

              Total Attempts

            </p>

          </div>

          <div className="overview-card">

            <div className="overview-icon blue">

              <BrainCircuit size={24} />

            </div>

            <h2>

              {
                results.length > 0
                  ? Math.round(
                      results.reduce(
                        (acc, curr) =>
                          acc + (curr.score || 0),
                        0
                      ) / results.length
                    )
                  : 0
              }%

            </h2>

            <p>

              Average Score

            </p>

          </div>

          <div className="overview-card">

            <div className="overview-icon green">

              <CheckCircle2 size={24} />

            </div>

            <h2>

              {
                results.filter(
                  (r) =>
                    r.score >= 70
                ).length
              }

            </h2>

            <p>

              Passed Assessments

            </p>

          </div>

          <div className="overview-card">

            <div className="overview-icon orange">

              <TrendingUp size={24} />

            </div>

            <h2>

              #12

            </h2>

            <p>

              Current Rank

            </p>

          </div>

        </div>

        {/* RESULTS LIST */}

        <div className="results-table-card">

          <div className="results-table-header">

            <h2>

              Recent Results

            </h2>

          </div>

          <div className="results-list">

            {
              results.map(
                (result, index) => (

                  <div
                    className="result-row"
                    key={index}
                  >

                    {/* LEFT */}

                    <div className="result-left">

                      <div className="result-rank">

                        <Trophy size={18} />

                      </div>

                      <div>

                        <h3>

                          {
                            result.assessment
                              ?.title
                              || "Assessment"
                          }

                        </h3>

                        <p>

                          Submitted Successfully

                        </p>

                      </div>

                    </div>

                    {/* CENTER */}

                    <div className="result-center">

                      <span>

                        Score

                      </span>

                      <h2>

                        {result.score || 0}%

                      </h2>

                    </div>

                    {/* RIGHT */}

                    <div className="result-right">

                      {
                        result.score >= 70 ? (

                          <div className="status-pass">

                            <CheckCircle2
                              size={16}
                            />

                            Passed

                          </div>

                        ) : (

                          <div className="status-fail">

                            <XCircle
                              size={16}
                            />

                            Failed

                          </div>
                        )
                      }

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

export default Results;