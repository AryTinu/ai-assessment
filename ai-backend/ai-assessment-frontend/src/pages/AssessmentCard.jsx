import { useNavigate } from "react-router-dom";

const AssessmentCard = ({
  id,
  title,
  difficulty,
}) => {

  const navigate = useNavigate();

  return (

    <div className="modern-assessment-item">

      <div>

        <div className={`difficulty-badge ${difficulty?.toLowerCase()}`}>

          {difficulty || "Medium"}

        </div>

        <h3>

          {title}

        </h3>

      </div>

      <button
        className="assessment-start-btn"
        onClick={() =>
          navigate(`/assessment/${id}`)
        }
      >

        Start →

      </button>

    </div>
  );
};

export default AssessmentCard;