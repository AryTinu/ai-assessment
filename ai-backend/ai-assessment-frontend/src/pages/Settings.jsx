import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  User,
  Lock,
  Bell,
  Moon,
  Shield,
  Save,
  Camera,
} from "lucide-react";

import "../styles/Settings.css";

const Settings = () => {

  /* USER */

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* STATES */

  const [darkMode, setDarkMode] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  return (

    <DashboardLayout>

      <div className="settings-page">

        {/* HEADER */}

        <div className="settings-header">

          <div>

            <h1>

              Settings ⚙️

            </h1>

            <p>

              Manage your account,
              preferences and security

            </p>

          </div>

        </div>

        {/* GRID */}

        <div className="settings-grid">

          {/* PROFILE */}

          <div className="settings-card">

            <div className="settings-card-header">

              <div className="settings-icon">

                <User size={22} />

              </div>

              <div>

                <h2>

                  Profile Settings

                </h2>

                <p>

                  Update your profile
                  information

                </p>

              </div>

            </div>

            {/* PROFILE IMAGE */}

            <div className="profile-upload">

              <div className="profile-avatar-large">

                {
                  user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"
                }

              </div>

              <button className="upload-btn">

                <Camera size={16} />

                Change Photo

              </button>

            </div>

            {/* FORM */}

            <div className="settings-form">

              <div className="settings-input-group">

                <label>

                  Full Name

                </label>

                <input
                  type="text"
                  defaultValue={
                    user?.name || ""
                  }
                />

              </div>

              <div className="settings-input-group">

                <label>

                  Email

                </label>

                <input
                  type="email"
                  defaultValue={
                    user?.email || ""
                  }
                />

              </div>

              <div className="settings-input-group">

                <label>

                  Role

                </label>

                <input
                  type="text"
                  defaultValue="Candidate"
                />

              </div>

            </div>

          </div>

          {/* SECURITY */}

          <div className="settings-card">

            <div className="settings-card-header">

              <div className="settings-icon">

                <Shield size={22} />

              </div>

              <div>

                <h2>

                  Security

                </h2>

                <p>

                  Manage passwords and
                  account protection

                </p>

              </div>

            </div>

            <div className="settings-form">

              <div className="settings-input-group">

                <label>

                  Current Password

                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                />

              </div>

              <div className="settings-input-group">

                <label>

                  New Password

                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                />

              </div>

            </div>

            {/* TWO FACTOR */}

            <div className="toggle-row">

              <div className="toggle-left">

                <Lock size={18} />

                <div>

                  <h4>

                    Two Factor Auth

                  </h4>

                  <p>

                    Add extra account
                    protection

                  </p>

                </div>

              </div>

              <button

                className={`toggle-btn ${
                  twoFactor
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  setTwoFactor(
                    !twoFactor
                  )
                }
              >

                <div className="toggle-circle"></div>

              </button>

            </div>

          </div>

          {/* PREFERENCES */}

          <div className="settings-card">

            <div className="settings-card-header">

              <div className="settings-icon">

                <Bell size={22} />

              </div>

              <div>

                <h2>

                  Preferences

                </h2>

                <p>

                  Customize your
                  experience

                </p>

              </div>

            </div>

            {/* NOTIFICATIONS */}

            <div className="toggle-row">

              <div className="toggle-left">

                <Bell size={18} />

                <div>

                  <h4>

                    Notifications

                  </h4>

                  <p>

                    Receive assessment
                    updates

                  </p>

                </div>

              </div>

              <button

                className={`toggle-btn ${
                  notifications
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  setNotifications(
                    !notifications
                  )
                }
              >

                <div className="toggle-circle"></div>

              </button>

            </div>

            {/* DARK MODE */}

            <div className="toggle-row">

              <div className="toggle-left">

                <Moon size={18} />

                <div>

                  <h4>

                    Dark Mode

                  </h4>

                  <p>

                    Enable dark theme
                    interface

                  </p>

                </div>

              </div>

              <button

                className={`toggle-btn ${
                  darkMode
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }
              >

                <div className="toggle-circle"></div>

              </button>

            </div>

          </div>

        </div>

        {/* SAVE */}

        <div className="settings-save">

          <button className="save-btn">

            <Save size={18} />

            Save Changes

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Settings;