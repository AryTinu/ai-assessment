import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import axiosInstance from "../api/axios";

import "../styles/Assessment.css";

const Assessments = () => {

  const navigate = useNavigate();

  const [assessments, setAssessments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchAssessments();

  }, []);

  const fetchAssessments = async () => {

    try {

      const response =
        await axiosInstance.get(
          "/api/assessment/all"
        );

      setAssessments(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="assessment-loading">

          Loading Assessments...

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="assessment-page-container">

        <div className="assessment-header-section">

          <h1>
            Available Assessments
          </h1>

          <p>
            Choose a test and start your
            evaluation journey
          </p>

        </div>

        <div className="assessment-grid">

          {assessments.map((assessment) => (

            <div
              key={assessment.id}
              className="assessment-card-modern"
            >

              <div>

                <div className="assessment-badge">

                  Assessment

                </div>

                <h2>
                  {assessment.title}
                </h2>

                <p>
                  {assessment.description}
                </p>

              </div>

              <div className="assessment-bottom">

                <span>

                  ⏱ {
                    assessment.durationMinutes
                  } mins

                </span>

                <button
                  className="start-btn"
                  onClick={() =>
                    navigate(
                      `/assessment/${assessment.id}`
                    )
                  }
                >

                  Start Test →

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Assessments;