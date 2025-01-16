import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import styles from './Navbar.module.css'; // Importing the styles for the navbar

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          App Dashboard
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/app" className={styles.navLink}>
            App
          </Link>
        </li>
        <li>
          <Link to="/path" className={styles.navLink}>
            path List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
