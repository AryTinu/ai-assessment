const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {

  return (

    <div className="modern-stat-card">

      {/* TOP */}

      <div className="stat-top">

        <div className="stat-icon">

          {icon}

        </div>

      </div>

      {/* CONTENT */}

      <div className="stat-content">

        <h4>

          {title}

        </h4>

        <h1>

          {value}

        </h1>

        <p>

          {subtitle}

        </p>

      </div>

    </div>
  );
};

export default StatCard;