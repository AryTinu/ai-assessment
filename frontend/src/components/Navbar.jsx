import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {

  const navigate =
    useNavigate();
    
  const user = JSON.parse(
  localStorage.getItem("user")
);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (

    <div className="navbar-dashboard">

      {/* SEARCH */}

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search assessments..."
        />

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        <Bell size={20} />

        {/* USER */}

        <div className="user-profile">

          <div className="avatar">

            A

          </div>

          <div>

            <h4>
  {user?.name || "User"}
</h4>

            <p>
  {user?.email}
</p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Navbar;