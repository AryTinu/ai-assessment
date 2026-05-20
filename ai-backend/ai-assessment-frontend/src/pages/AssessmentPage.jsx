import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import axiosInstance from "../api/axios";

import "../styles/Assessment.css";

const AssessmentPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [assessment, setAssessment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(0);

  const [attemptId, setAttemptId] =
    useState(null);

  /* FETCH ASSESSMENT */

  useEffect(() => {

    fetchAssessment();

  }, []);

  const fetchAssessment = async () => {

    try {

      /* GET ASSESSMENT */

      const response =
        await axiosInstance.get(
          `/api/assessment/${id}`
        );

      setAssessment(response.data);

      setTimeLeft(
        response.data.durationMinutes * 60
      );

      /* REAL LOGGED IN USER */

const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user || !user.id) {

  alert(
    "Please login again"
  );

  navigate("/login");

  return;
}

      /* START ATTEMPT */

      const startResponse =
        await axiosInstance.post(

          `/api/assessment/attempt/start/${id}/${user.id}`

        );

      console.log(
        "Attempt Started:",
        startResponse.data
      );

      /* SAVE ATTEMPT ID */

      setAttemptId(
        startResponse.data.id
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  /* TIMER */

  useEffect(() => {

    if (!timeLeft) return;

    const timer =
      setInterval(() => {

        setTimeLeft(prev => prev - 1);

      }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  /* FORMAT TIME */

  const formatTime = (seconds) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  /* ANSWERS */

  const handleAnswer = (
    questionIndex,
    option
  ) => {

    setAnswers({

      ...answers,

      [questionIndex]: option,
    });
  };

  /* NEXT */

  const nextQuestion = () => {

    if (

      currentQuestion <
      assessment.questions.length - 1

    ) {

      setCurrentQuestion(
        prev => prev + 1
      );
    }
  };

  /* PREVIOUS */

  const prevQuestion = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion(
        prev => prev - 1
      );
    }
  };

  /* SUBMIT */

  const handleSubmit = async () => {

    let score = 0;

    assessment.questions.forEach(

      (question, index) => {

        if (

          answers[index] ===
          question.correctAnswer

        ) {

          score += 1;
        }
      }
    );

    const percentage =
      Math.round(
        (score / assessment.questions.length)
        * 100
      );

    try {

      /* SUBMIT REAL ATTEMPT */

      await axiosInstance.post(

        `/api/assessment/attempt/submit/${attemptId}/${percentage}`

      );

      alert(
        `Assessment Submitted 🚀\nScore: ${percentage}%`
      );

      /* REDIRECT */

      navigate("/results");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to submit assessment"
      );
    }
  };

  /* LOADING */

  if (loading) {

    return (

      <DashboardLayout>

        <div className="assessment-loading">

          Loading Assessment...

        </div>

      </DashboardLayout>
    );
  }

  /* EMPTY */

  if (
    !assessment ||
    !assessment.questions ||
    assessment.questions.length === 0
  ) {

    return (

      <DashboardLayout>

        <div className="assessment-loading">

          No Questions Found

        </div>

      </DashboardLayout>
    );
  }

  const question =
    assessment.questions[currentQuestion];

  return (

    <DashboardLayout>

      <div className="assessment-page">

        {/* HEADER */}

        <div className="assessment-header">

          <div>

            <h1>
              {assessment.title}
            </h1>

            <p>
              {assessment.description}
            </p>

          </div>

          <div className="timer-card">

            ⏳ {formatTime(timeLeft)}

          </div>

        </div>

        {/* PROGRESS */}

        <div className="progress-wrapper">

          <div
            className="progress-bar"
            style={{
              width: `${(
                (currentQuestion + 1)
                / assessment.questions.length
              ) * 100}%`
            }}
          ></div>

        </div>

        {/* QUESTION NAVIGATION */}

        <div className="question-navigation-panel">

          <div className="navigator-header">

            Questions

          </div>

          <div className="navigator-grid">

            {assessment.questions.map((_, index) => (

              <button

                key={index}

                className={`navigator-box

                  ${currentQuestion === index
                    ? "navigator-active"
                    : ""}

                  ${answers[index]
                    ? "navigator-answered"
                    : ""}
                `}

                onClick={() =>
                  setCurrentQuestion(index)
                }
              >

                {index + 1}

              </button>
            ))}

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="modern-question-card">

          {/* TOP */}

          <div className="question-header-modern">

            <div className="question-number">

              Question {currentQuestion + 1}

            </div>

            <div className="question-progress-text">

              {currentQuestion + 1}
              /
              {assessment.questions.length}

            </div>

          </div>

          {/* QUESTION */}

          <h2 className="modern-question-text">

            {question.questionText}

          </h2>

          {/* OPTIONS */}

          <div className="modern-options-grid">

            {["A", "B", "C", "D"].map((option) => {

              const value =
                question[`option${option}`];

              return (

                <button

                  key={option}

                  className={`modern-option-btn ${
                    answers[currentQuestion] === option
                      ? "modern-option-selected"
                      : ""
                  }`}

                  onClick={() =>
                    handleAnswer(
                      currentQuestion,
                      option
                    )
                  }
                >

                  <div className="option-letter">

                    {option}

                  </div>

                  <span>

                    {value}

                  </span>

                </button>
              );
            })}

          </div>

          {/* ACTIONS */}

          <div className="modern-actions">

            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="secondary-action-btn"
            >

              Previous

            </button>

            {

              currentQuestion ===
              assessment.questions.length - 1

              ? (

                <button
                  onClick={handleSubmit}
                  className="submit-action-btn"
                >

                  Submit Test

                </button>

              ) : (

                <button
                  onClick={nextQuestion}
                  className="primary-action-btn"
                >

                  Next Question →

                </button>
              )
            }

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AssessmentPage;