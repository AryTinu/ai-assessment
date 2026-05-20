import "../styles/Cards.css";

const RecentAttemptCard = ({
  title,
  score,
}) => {

  return (
    <div className="recent-card">

      <div>

        <h3>
          {title}
        </h3>

        <p>
          Recently completed
        </p>

      </div>

      <h2>
        {score}%
      </h2>

    </div>
  );
};

export default RecentAttemptCard;