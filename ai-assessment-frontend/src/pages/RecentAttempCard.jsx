const RecentAttemptCard = ({
  title,
  score,
}) => {

  return (

    <div className="recent-attempt-modern">

      <div>

        <h3>

          {title}

        </h3>

        <p>

          Recently completed

        </p>

      </div>

      <div className="score-pill">

        {score}%

      </div>

    </div>
  );
};

export default RecentAttemptCard;