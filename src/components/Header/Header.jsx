import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>🍌</h1>
      </div>
      {token && (
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/player/leaderboard" className={styles.navLink}>
                Leaderboard
              </Link>
            </li>
            <button onClick={handleLogOut}>Log out</button>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
