import "../styles/Cards.css";

const StatCard = ({
  title,
  value,
  subtitle,
}) => {

  return (
    <div className="stat-card-modern">

      <div>

        <p className="stat-title">
          {title}
        </p>

        <h1 className="stat-value">
          {value}
        </h1>

      </div>

      <p className="stat-subtitle">
        {subtitle}
      </p>

    </div>
  );
};

export default StatCard;