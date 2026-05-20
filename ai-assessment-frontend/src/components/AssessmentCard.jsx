import { useNavigate } from "react-router-dom";

import "../styles/Cards.css";

const AssessmentCard = ({
  id,
  title,
  difficulty,
}) => {

  const navigate = useNavigate();

  const startAssessment = () => {

    navigate(`/assessment/${id}`);
  };

  return (

    <div className="assessment-card">

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {difficulty}
        </p>

      </div>

      <button onClick={startAssessment}>

        Start

      </button>

    </div>
  );
};

export default AssessmentCard;