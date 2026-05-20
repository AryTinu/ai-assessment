import {
  LayoutDashboard,
  ClipboardList,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "../styles/Sidebar.css";

const Sidebar = () => {

  return (
    <div className="sidebar">

      <div>

        <div className="sidebar-logo">
          AI Assess
        </div>

        <div className="sidebar-links">

          <NavLink to="/dashboard">
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/assessments">
            <ClipboardList size={18} />
            Assessments
          </NavLink>

          <NavLink to="/leaderboard">
            <Trophy size={18} />
            Leaderboard
          </NavLink>

          <NavLink to="/analytics">
            <BarChart3 size={18} />
            Analytics
          </NavLink>

          <NavLink to="/settings">
            <Settings size={18} />
            Settings
          </NavLink>

        </div>

      </div>
    </div>
  );
};

export default Sidebar;